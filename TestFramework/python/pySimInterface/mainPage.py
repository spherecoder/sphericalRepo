'''
Created on 5 Feb 2010

@author: ole
'''
from pySimInterface.mainTabContainer import mainTabContainer

docroot = "http://localhost/~ole/mine/"
cgiroot = "http://localhost/mine"
class mainPage(object):
    '''
    The class represents the main HTML page. It contains functions to 
    create the page and update subsections of the page
    '''


    def __init__(self, params):
        '''
        Constructor
        '''
        self.x = 1
    
    def createHeader(self):
        print( '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"' )
        print( '"http://www.w3.org/TR/html4/loose.dtd">' )
        print('<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr">')
        print('<head>')
        print('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />')
        print('<title>SPHERE DRH Simulation and Test Framework</title>')
        print('<script type="text/javascript"> djConfig = { isDebug: false, parseOnLoad: true }; </script>')
        print('<script type="text/javascript" src="' + docroot + '/lib/dojo/dojo.js"></script>')
        print('<script type="text/javascript">')
        print('dojo.require("dijit.layout.TabContainer");')
        print('dojo.require("dijit.layout.ContentPane");')
        print('dojo.require("dijit.form.TextBox");')
        print('dojo.require("dijit.form.ComboBox");')
        print('dojo.require("dijit.form.Form");')
        print('dojo.require("dijit.form.Button");')
        print('dojo.require("dojo.parser");') 
        print('dojo.require("dojo.fx");')
        print('dojo.require("dojo.dnd.move");')
        print('</script>')

        print('<style type="text/css">')
        print('@import "' + docroot + '/lib/dojo/resources/dojo.css";')
        print('@import "' + docroot + '/lib/dijit/themes/tundra/tundra.css";')
        print('@import "' + docroot + '/styles/sims_main.css";')
        print('</style>')

        print('</head>')
        print('<body>')
        print('<div class="pySimInterface_mainPage">')
        print('<div id="top_bar"></div>')
        print('<div class="pySimInterface_mainPage_simTitle">SPHERE Data Reduction Test and Simulation Framework</div>')
        print('<div class="pySimInterface_mainMenu"></div>')
        print('<div class="pySimInterface_mainContent">')
        
    def addMainTabContainer(self):
        print('<div dojoType="dijit.form.Form" id="myForm" jsId="myForm" encType="multipart/form-data" action="' + cgiroot + '/python/createPages.py" method="GET">')
        print('<script type="dojo/method" event="onSubmit">')
        print('if (this.validate()) {')
        print('            return confirm(\'Form is valid, press OK to submit\');')
        print('        } else {')
        print('            alert(\'Form contains invalid data.  Please correct first\');')
        print('            return false;')
        print('        }')
        print('        return true;')
        print('</script>')

        self.mainTab = mainTabContainer()
        print( self.mainTab.getHTMLRepresentation())
        print('<div class="submitButtons">')
        print('<button dojoType="dijit.form.Button" type="submit" name="submitButton" value="Submit">')
        print('        Submit')
        print('</button>')
        print('<button dojoType="dijit.form.Button" type="reset">')
        print('Reset')
        print('</button>')
        print('</div>')
        print('</div>')
          
        
    def createFooter(self):
        print('</div>')
        print('</div>')
        print('</body>')
        print('</html>')
    