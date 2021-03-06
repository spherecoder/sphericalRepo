###################################################################
#  
# This file is part of the TWYST code package.
# Plase see the LICENSE file for information on LICENSING
#  
# Created on May 1, 2011
#
# author: ole
# 
###################################################################
from twyst.core.TwystObject import TwystObject
from twisted.internet.protocol import Protocol

from sys import stdout
from twyst.protocols.FileButler import FileButler

class FileReceiver(TwystObject,Protocol):
    '''
    classdocs
    '''
    file = None
    def setFilename(self,filename):
        self.filename = filename
        if self.file:
            self.file.close()
        self.file = open(self.filename,"w")
    def connectionMade(self):
        pass
        
    def connectionLost(self,reason=None):
        if self.file:
            self.file.close()

        
    def sendSendRequest(self,subdir,filename):
        self.transport.write("GETFILE" + subdir + FileButler.PATH_SEP + filename) 
                   
    def dataReceived(self,data):
        if self.file:
            if self.file.closed:
                filenew = open(self.file.name,"a")
                self.file = filenew
            self.file.write(data)
        else:
            print "No file open"
