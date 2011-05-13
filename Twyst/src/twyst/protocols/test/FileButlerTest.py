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

import unittest

from twisted.internet import reactor
from twyst.test.TestingServerClientFactory import TestingServerClientFactory
from unittest import TextTestRunner
from twisted.internet.defer import Deferred

def registerListenPort(listenport,filebutlertest):
    filebutlertest.listenport = listenport
        
def connect(protocol,filebutlertest):
    filebutlertest.protocol = protocol
    unittest.main()

def DigestResult(var):
    print "Resulttttt"
       
class FileButlerTest(unittest.TestCase):
    protocol = None  
    listenport = None
    
    def setUp(self):
        pass


    def tearDown(self):
        pass


    def testA(self):
        self.assertEqual(1,0)
#        FileButlerTest.protocol.transport.write("SEND")
        pass
    def testB(self):
        print "Hahaha"
        self.assertEqual(1,0)
#        FileButlerTest.protocol.transport.write("SEND")
        pass
    def runTest(self):
        pass


if __name__ == "__main__":
    fbt = FileButlerTest()
    tsf = TestingServerClientFactory()
    tsf.createFileButlerServer(registerListenPort,fbt)
    tsf.createFileReceiverClient(connect,fbt)
    d = Deferred().addErrback(reactor.stop)
#    Deferred().addCallback(reactor.stop)
    reactor.callLater(4,reactor.stop)
    reactor.run()

