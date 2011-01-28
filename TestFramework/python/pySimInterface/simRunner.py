'''
Created on 9 Feb 2010

@author: ole
'''
import ConfigParser
import os
import sphere as sph

class simRunner(object):
    '''
    classdocs
    '''
    required_secs = ['GENERAL', 'INSTRUMENT SETTINGS', 'NGC SETTINGS' ]
    required_opts = [ ['GENERAL', 'NAME' ], ['GENERAL', 'INSTRUMENT' ], ['GENERAL','RECIPE'] ]
    instrument = "IFS"
    recipe = "sph_ifs_master_dark"
    name = "mySim"
    dirname = "mySim/data"
    config = None
    
    def __init__(self):
        '''
        Constructor
        '''
            
    def __writeDirs(self):
        if not os.access(self.dirname, os.F_OK ):
            os.makedirs(self.dirname )
        fw = open( self.name + "/simu.ini", "w")
        self.config.write( fw )
        
        fw.close()

    def loadIni(self, filename):
        config = ConfigParser.RawConfigParser()
        config.read( filename )
        self.config = config
        for sec in self.required_secs:
            if not config.has_section( sec ):
                print("Cant find " + sec + " section")
                return
        for reqopts in self.required_opts:
            if not config.has_option( reqopts[0], reqopts[1] ):
                print("Cant find " + reqopts[1] + " in section " + reqopts[0] + " !" )
                return
        
        self.instrument = config.get( "GENERAL", "INSTRUMENT" )
        self.recipe = config.get( "GENERAL", "RECIPE" )
        self.name = config.get( "GENERAL", "NAME" )
        self.dirname = self.name + "/data"
        self.__writeDirs()
    
    def runSim(self):
        sph.sph_init_debug()
        self.pupilimagecreator = sph.sph_test_pupilimage_creator_new()
        sph.sph_test_pupilimage_creator_create_binary_star_frames( self.pupilimagecreator, 10.0, 0.0, 1.0, 1000.0, 100.0, 5.0, 20 )
        