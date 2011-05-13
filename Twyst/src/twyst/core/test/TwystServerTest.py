###################################################################
#  
# This file is part of the TWYST code package.
# Plase see the LICENSE file for information on LICENSING
#  
# Created on May 11, 2011
#
# author: ole
# 
###################################################################

import unittest
from twyst.test.TestingServerClientFactory import TestingServerClientFactory
from twisted.internet import reactor
from twisted.internet.defer import Deferred
from twisted.trial.unittest import TestCase
from twisted.trial.reporter import TestResult

def connected(a):
    print "connected"
    
def callb(a,b):
    print str(a) + " ---- " + str(b)
    return a

class TwystServerTest(TestCase):

    server = None
    client = None
    def setUp(self):
        self.server = TestingServerClientFactory()
        self.server.createFileButlerServer()
        self.client = TestingServerClientFactory()
        self.client.createFileReceiverClient(connected)
        return


    def tearDown(self):
        d = Deferred()
        self.server.sport_ref.stopListening()


    def testSendFile(self):
        d = self.server.sport_ref.stopListening()
