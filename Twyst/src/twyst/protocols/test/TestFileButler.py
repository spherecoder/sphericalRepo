###################################################################
#  
# This file is part of the TWYST code package.
# Plase see the LICENSE file for information on LICENSING
#  
# Created on May 30, 2011
#
# author: ole
# 
###################################################################

import unittest
from twisted.internet.protocol import Factory
from twyst.protocols.FileButler import FileButler
from twisted.internet.endpoints import TCP4ServerEndpoint, TCP4ClientEndpoint
from twyst.test import unity
from twyst.protocols.FileReceiver import FileReceiver
from twisted.internet import threads, reactor
from unittest import TestCase



class TestFileButler(TestCase):
    protocol = None
    server = None
    port = None
    
    def registerProtocol(self,protocol):
        self.protocol = protocol
        self.protocol.setFilename("testingout.txt")
        
    def registerPort(self,port):
        self.port = port
        
    def setUpServer(self):
        '''We test with a FileButler server started here.'''
        factory = Factory()
        factory.protocol = FileButler
        factory.numProtocols = 0
        factory.filename = "testingin.txt"
        endpoint = TCP4ServerEndpoint(reactor, 8007)
        d = endpoint.listen(factory)
        d.addCallback(self.registerPort)
        return d
    def setUpClient(self):
        factory = Factory()
        factory.protocol = FileReceiver
        point = TCP4ClientEndpoint(reactor, "localhost", 8007)
        d = point.connect(factory)
        d.addCallback(self.registerProtocol)
        return  d
    
    def setUpp(self):
        self.server = self.setUpServer()            
        d = self.setUpClient()
        return  d
    
    def setUp(self):
        try:
            threads.blockingCallFromThread(reactor, self.setUpp)  
        except:
            print "Error setting up the test."

    def tearDown(self):
        threads.blockingCallFromThread(reactor,self.port.loseConnection)
        pass

    def testConnectionMade(self):
        self.assertNotEqual(self.protocol,None)
        pass
    

    def testDataReceived(self):
        self.assertNotEqual(self.protocol,None)
        threads.blockingCallFromThread(reactor,self.protocol.transport.write,"Start something")
        threads.blockingCallFromThread(reactor,self.protocol.transport.loseConnection)
        unity.wait(0.1)
        f = open("testingout.txt","r")
        self.assertNotEqual(f,None)
        for i in range(0,100):
            l = f.readline()
            self.assertEqual(l,"This is a test line" + str(i) +"\n")
        f.close()
        
           
if __name__ == "__main__":
    unity.starttest()