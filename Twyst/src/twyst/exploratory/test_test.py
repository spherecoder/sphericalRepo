###################################################################
#  
# This file is part of the TWYST code package.
# Plase see the LICENSE file for information on LICENSING
#  
# Created on May 19, 2011
#
# author: ole
# 
###################################################################

#from twisted.trial.unittest import TestCase
#from twisted.trial.reporter import TestResult
from twisted.internet.protocol import Factory, Protocol
from twisted.internet.endpoints import TCP4ServerEndpoint, TCP4ClientEndpoint
from twisted.internet import reactor, threads
from unittest import TestCase
from twyst.test import unity

class MyProtocolServerSide(Protocol):
    def dataReceived(self,data):
        self.transport.write(data)
#        self.transport.write("An apple a day keeps the doctor away 2\r\n") 
    def connectionMade(self):
        self.transport.write("I am the server\r\n") 
#        self.transport.loseConnection()

class MyProtocolClientSide(Protocol):
    def dataReceived(self,data):
        print data
    def connectionMade(self):
        self.transport.write("I am the client and now connected to server.\r\n") 
#        self.transport.loseConnection()


class Test(TestCase):
    
    protocol = None
    done = 0
    def registerProtocol(self,protocol):
        self.protocol = protocol
        
    def setUpp(self):
        factory = Factory()
        factory.protocol = MyProtocolServerSide
        factory_c = Factory()
        factory_c.protocol = MyProtocolClientSide
        endpoint = TCP4ServerEndpoint(reactor, 8007)
        endpoint.listen(factory)
        point = TCP4ClientEndpoint(reactor, "localhost", 8007)
        d = point.connect(factory_c)
        d.addCallback(self.registerProtocol)
        return d
    def setUp(self):
        try:
            threads.blockingCallFromThread(reactor, self.setUpp)  
        except:
            print "Error setting up the test."
        pass


    def tearDown(self):
        # The waiting here is important to ensure there is time for all tests
        # to finish.
        unity.wait(1)
        unity.wrapBlocking(self.protocol.transport.loseConnection)
        pass


    def testName(self):
        self.assertEqual(1,1)
        unity.wrapBlocking(self.protocol.transport.write,"Hello!")  
        pass
        
if __name__ == '__main__':
    unity.starttest()