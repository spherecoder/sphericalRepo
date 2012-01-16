###################################################################
#  
# This file is part of the TWYST code package.
# Plase see the LICENSE file for information on LICENSING
#  
# Created on May 21, 2011
#
# author: ole
# 
###################################################################
import unittest
from twisted.internet import reactor, threads
import time

done = 0

    

def _wrapBlocking(f,*a,**kw):
    d = threads.deferToThread(f,*a,**kw)
    return d

def wrapBlocking(f,*a,**kw):
    '''This wraps a function to make sure all is halted until the function
    is done. This works also for functions that return deferreds.'''
    try:
        threads.blockingCallFromThread(reactor,_wrapBlocking,f,*a,**kw)  
#        threads.blockingCallFromThread(reactor,f,*a,**kw)  
    except:
        print "An exception was raised when wrapBlocking..."

def wait(sec):
    wrapBlocking(time.sleep,sec)
    
def __startingit():
    try:
        unittest.main()    
    except:
        pass
    reactor.callFromThread(reactor.stop)

def _starttest():
    print "Starting test..."
    d = reactor.callInThread(__startingit)
    print "Started test."

def getreactor():
    return reactor

def starttest():
    reactor.callWhenRunning(_starttest)
    reactor.run()
