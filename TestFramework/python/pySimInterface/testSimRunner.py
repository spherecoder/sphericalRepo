'''
Created on 9 Feb 2010

@author: ole
'''
import unittest
from ConfigParser import ConfigParser, RawConfigParser
from pySimInterface.simRunner import simRunner
from fileinput import close


class Test(unittest.TestCase):

    def createIni(self):
        config = RawConfigParser()
        config.add_section("GENERAL")
        config.add_section("INSTRUMENT SETTINGS")
        config.add_section("NGC SETTINGS")
        config.set("GENERAL", "INSTRUMENT", "IRDIS")
        config.set("GENERAL", "NAME", "IRDISRecTest")
        config.set("GENERAL", "RECIPE", "sph_ird_master_dark")
        fp = open( "test.ini", "w" )
        config.write(fp)
        fp.close()
        
    def testLoadIni(self):
        self.createIni()
        runner = simRunner()
        
        runner.loadIni("test.ini")
        self.assertEqual( runner.instrument, "IRDIS" )
    
    def testRunSim(self):
        self.createIni()
        runner = simRunner()
        runner.runSim()

if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testLoadIni']
    unittest.main()