'''
Created on 8 Feb 2010

@author: ole
'''
from pySimInterface.generalPane import generalPane
from pySimInterface.ngcSimulationPane import ngcSimulationPane
from pySimInterface.pupilImagePane import pupilImagePane
from pySimInterface.instrumentPane import instrumentPane

class mainTabContainer(object):
    '''
    classdocs
    '''

    def __init__(self):
        '''
        Constructor
        '''
        self.instrumentPane = instrumentPane()
        self.generalPane = generalPane()
        self.ngcPane = ngcSimulationPane()
        self.pupilImagePane = pupilImagePane()
    
    def getHTMLRepresentation(self):
        text = '<div id="pySimInterface_mainTabContainer" class="tundra" style="width: 500px; height: 400px">\n'
        text = text + '<div dojoType="dijit.layout.TabContainer" style="width: 100%; height: 100%;" doLayout="true">\n'
        text = text + self.generalPane.getHTMLRepresentation()
        text = text + self.pupilImagePane.getHTMLRepresentation()
        text = text + self.instrumentPane.getHTMLRepresentation()
        text = text + self.ngcPane.getHTMLRepresentation()        
        text = text + '</div>\n'
        text = text + '</div>\n'
        return text