###################################################################
#  
# This file is part of the TWYST code package.
# Plase see the LICENSE file for information on LICENSING
#  
# Created on May 5, 2011
#
# author: ole
# 
###################################################################
from twisted.internet.protocol import Factory
from twyst.protocols.FileButler import FileButler
from twisted.internet.endpoints import TCP4ServerEndpoint, TCP4ClientEndpoint
from twisted.internet import reactor
from twyst.protocols.FileReceiver import FileReceiver
from twisted.python.failure import Failure

def connectionError(reason):
    print "Could not connect" + str(reason)
    return

def registerPort(port,factory):
    factory.sport_ref = port
    print "Registered port " + str(port) + " with factory"
    
class TestingServerClientFactory(object):
    '''
    classdocs
    '''
    
    sport_ref = None
    def __init__(self):
        '''
        Constructor
        '''
        self.sport_ref = None
        
    def createFileButlerServer(self, callb=None, *args, **kw):
        factory = Factory()
        factory.numProtocols = 0
        factory.protocol = FileButler
        # 8007 is the port you want to run under. Choose something >1024
        endpoint = TCP4ServerEndpoint(reactor, 8007)
        d = endpoint.listen(factory)
        d.addErrback(connectionError)
        d.addCallback(registerPort,self)
        if callb:
            d.addCallback(callb, *args, **kw)
        return factory
    
    def createFileReceiverClient(self, callb=None, *args, **kw):
        factory = Factory()
        factory.protocol = FileReceiver    
        # 8007 is the port you want to run under. Choose something >1024
        point = TCP4ClientEndpoint(reactor, "localhost", 8007)
        d = point.connect(factory)
        if callb: 
            d.addCallback(callb, *args, **kw)
        return factory
