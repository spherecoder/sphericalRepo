'''
Created on 8 Feb 2010

@author: ole
'''

class instrumentPane(object):
    '''
    classdocs
    '''


    def __init__(self):
        '''
        Constructor
        '''
    def getHTMLRepresentation(self):
        text = '<div id="pySimInterface_instrumentPane" dojoType="dijit.layout.ContentPane" title="Instrument Settings">\n'
        text = text + 'Aha\n'
        text = text + '</div>\n'
        return text
        