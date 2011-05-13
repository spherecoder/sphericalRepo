###################################################################
#  
# This file is part of the TWYST code package.
# Plase see the LICENSE file for information on LICENSING
#  
# Created on May 3, 2011
#
# author: ole
# 
###################################################################
from twyst.core.TwystObject import TwystObject
from twyst.protocols.FileButler import FileButler


class TwystServer(TwystObject):
    '''
    classdocs
    '''

    rootdir = ""
    def __init__(self,rootdir):
        '''
        Constructor
        '''
        self.rootdir = rootdir
        
    def sendFile(self,subdir,filename,filebutler):
        filebutler.sendReceiveRequest(subdir,filename)

    def receiveFile(self,subdir,filename,filebutler):
        filebutler.sendSendRequest(subdir,filename)
        