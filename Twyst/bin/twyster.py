###################################################################
#  
# This file is part of the TWYST code package.
# Plase see the LICENSE file for information on LICENSING
#  
# Created on Feb 23, 2011
#
# author: ole
# 
###################################################################

from twyst.protocols.FileButler import FileButler
from twisted.internet.protocol import Factory,Protocol
from twisted.internet import reactor
from twisted.internet.endpoints import TCP4ServerEndpoint, TCP4ClientEndpoint

import getopt,sys
from twyst.protocols.FileReceiver import FileReceiver

class ClientFac(Factory):
    protocol = FileReceiver
    filename = None    
    def __init__(self,filename):
        self.filename = filename
    def buildProtocol(self, addr):
        """Create an instance of a subclass of Protocol.

        The returned instance will handle input on an incoming server
        connection, and an attribute \"factory\" pointing to the creating
        factory.

        Override this method to alter how Protocol instances get created.

        @param addr: an object implementing L{twisted.internet.interfaces.IAddress}
        """
        p = self.protocol()
        p.factory = self
        p.setFilename(self.filename)
        return p
    

def usage():
    print "Usage: twyster -c|-s"
    print "Options:"
    print "         -c    start in client mode"
    print "         -s    start in server mode"
    
if __name__ == '__main__':
    
    try:
        opts, args = getopt.getopt(sys.argv[1:], "hcs:", ["help", "server",
                                                          "client"])
    except getopt.GetoptError, err:
        # print help information and exit:
        print str(err) # will print something like "option -a not recognized"
        usage()
        sys.exit(2)
    
    mode = "client"
    for opt,value in opts:
        if opt == "--client":
            print "Entering client mode"
            mode = "client"
        elif opt == "--server":
            print "Entering server mode"
            mode = "server"
        else:
            print "Unknown option"
            usage()
            sys.exit(1) 
    
    if ( mode == "server"):
        factory = Factory()
        factory.numProtocols = 0
        factory.protocol = FileButler
        # 8007 is the port you want to run under. Choose something >1024
        endpoint = TCP4ServerEndpoint(reactor, 8007)
        endpoint.listen(factory)
        reactor.run()
    if ( mode == "client"):
        factory = ClientFac(args[0])
        
        # 8007 is the port you want to run under. Choose something >1024
        point = TCP4ClientEndpoint(reactor, "localhost", 8007)
        point.connect(factory)
        reactor.run()
        