###################################################################
#  
# This file is part of the TWYST code package.
# Plase see the LICENSE file for information on LICENSING
#  
# Created on ${date}
#
# author: ${user}
# 
###################################################################
from twyst.core.TwystObject import TwystObject
from twisted.internet.protocol import Protocol
import os

class FileButler(TwystObject,Protocol):
    '''
    classdocs
    '''

    dirname = ""
    current_filename = ""
    CHUNK_SIZE = 2 ** 14
    file = None
    PATH_SEP = "####"
    MODE_RECFILE = 0
    MODE_SENDFILE = 0
    mode = MODE_RECFILE
    def connectionMade(self):
        self.factory.numProtocols = self.factory.numProtocols+1
        self.mode = FileButler.MODE_RECFILE 
        if self.factory.numProtocols > 100:
            self.transport.write("Too many connections, try later") 
            self.transport.loseConnection()

    def connectionLost(self, reason):
        self.factory.numProtocols = self.factory.numProtocols-1

    def sendReceiveRequest(self,subdir,filename):
        self.transport.write("PLEASERECEIVE" + subdir + FileButler.PATH_SEP + filename)
        self.mode = self.MODE_SENDFILE
        
    def sendSendRequest(self,subdir,filename):
        self.file = open(self.current_filename,"w")
        self.transport.write("PLEASESEND" + subdir + FileButler.PATH_SEP + filename)
        self.mode = self.MODE_RECFILE
    
    def dataReceived(self, data):
        print data
        if data.startswith("SEND") or data.startswith("PLEASESEND"):
            if self.file:
                    data = self.file.read(self.CHUNK_SIZE)
                    if not data:
                        self.file.close()
                        self.file = None
                        self.transport.loseConnection()
                    self.mode = FileButler.MODE_SENDFILE
                    self.transport.write(data)
                    
            else:
                try:
                    self.current_filename = data[7:].strip()
                    self.file = open(self.current_filename)
                    dat = self.file.read(self.CHUNK_SIZE)
                    self.mode = FileButler.MODE_SENDFILE
                    self.transport.write(dat)
                except Exception as e:
                    pass
        elif data.sartswith("PLEASERECEIVE"):
            subdir,filename = data[13:].split(FileButler.PATH_SEP) 
            self.mode = FileButler.MODE_RECFILE
            self.transport.write("SEND")            
        elif self.mode == FileButler.MODE_RECFILE:
            if self.file:
                self.file.write(data)
        else:
            self.transport.write(data)
