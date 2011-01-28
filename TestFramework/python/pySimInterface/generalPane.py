'''
Created on 8 Feb 2010

@author: ole
'''

class generalPane(object):
    '''
    classdocs
    '''
    supported_recipes = ['sph_ird_master_dark', 'sph_ird_instrument_flat', 'sph_ird_science_dbi', 'sph_ird_science_ci']
    supported_instruments = [ 'IRDIS' ]
    filename = "mySimulation.ini"
    name = "mySimulation"

    def __init__(self):
        '''
        Constructor
        '''
    def getHTMLRepresentation(self):
        text = '<div id="pySimInterface_generalPane" dojoType="dijit.layout.ContentPane" title="General" selected="true">\n'
        text = text + '<span class="generalPane_textfield">Name of simulation:</span><input class="generalPane_input" type="text" name="simname" value="' + self.name + '" dojoType="dijit.form.TextBox" trim="true" id="simname" propercase="true"/><br/>\n'
        text = text + '<span class="generalPane_textfield">Filename of ini file:</span><input class="generalPane_input" type="text" name="filename" value="' + self.filename + '" dojoType="dijit.form.TextBox" trim="true" id="filename" propercase="true"/><br/>\n'
        text = text + '<span class="generalPane_textfield">Instrument:</span><select class="generalPane_input" name="Instrument">\n'
        for inst in self.supported_instruments:
            text = text + '<option>' + inst + '</option>\n'
        text = text + '</select><br/>\n'
        text = text + '<span class=generalPane_textfield>Recipe to simulate for:</span> <select class="generalPane_input" name=Recipe>\n'
        for rec in self.supported_recipes:
            text = text + '<option>' + rec + '</option>\n'
        text = text + '</select>\n'
        text = text + '</div>\n'
        return text