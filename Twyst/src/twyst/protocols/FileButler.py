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

    def setFilename(self,filename):
        self.current_filename = filename
    
    def connectionMade(self):
        self.factory.numProtocols = self.factory.numProtocols + 1
        if self.factory.numProtocols > 100:
            self.transport.write("Too many connections, try later") 
            self.transport.loseConnection()
        if self.factory.filename:
            self.setFilename(self.factory.filename)

    def connectionLost(self, reason):
        self.factory.numProtocols = self.factory.numProtocols-1

    def dataReceived(self, data):
        if self.file:
            data = self.file.read(self.CHUNK_SIZE)
            if not data:
                self.file.close()
                self.file = None
                self.transport.loseConnection()
            self.transport.write(data)
        elif self.current_filename == None:
            return
        else:
            try:
                self.file = open(self.current_filename)
                dat = self.file.read(self.CHUNK_SIZE)
                self.transport.write(dat)
            except Exception as e:
                pass
