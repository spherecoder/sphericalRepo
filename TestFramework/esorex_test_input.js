/**
 * @author ole
 */

dojo.require("dijit.layout.AccordionContainer");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.form.ComboBox");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dijit.Tree");
dojo.require("dijit.tree.dndSource");
dojo.require("dojo.parser");
dojo.require("dojo.fx");
dojo.require("dojo.dnd.Source");
function json_combo( urlin, alabel, val ) {
    var aPane = new dijit.layout.ContentPane({content: alabel+":"});
    var aStore = new dojo.data.ItemFileReadStore({
            url: urlin
    });

   var aInput = new dijit.form.ComboBox({label: alabel, id: alabel, value: val, store: aStore });
   aInput.placeAt(aPane.domNode);
   return aPane;  
}

function set_instrument_event() {
	var insNode = dijit.byId("Instrument");
	var ins = insNode.get("value");
	var recipeNode = dijit.byId("Recipe");
    var stateStore = null;
	if ( ins == "IRDIS" ) {
		stateStore = new dojo.data.ItemFileReadStore({
            url: "recipes_irdis.json"
        });
		recipeNode.store = stateStore;
	}
    if ( ins == "IFS" ) {
        stateStore = new dojo.data.ItemFileReadStore({
            url: "recipes_ifs.json"
        });
        recipeNode.store = stateStore;
    }
}
function set_recipe(recipename) {
	
}
function set_recipe_event() {
    var recipeNode = dijit.byId("Recipe");
    var insNode = dijit.byId("Instrument");
	var recipename = recipeNode.get("value");
    var ins = insNode.get("value");
	set_recipe(recipename);
	getSofTagList(ins,recipename);
}

function GeneralPane_create() {
   var generalPane = new dijit.layout.ContentPane({id: "generalpane", title: "General"});
   var testerNameInput = json_combo( "tester_names.json", "Tester", "Nobody" );
   var instInput = json_combo( "instruments.json", "Instrument", "IFS");
   var recipeInput = json_combo( "recipes_ifs.json", "Recipe", "sph_ifs_master_dark" );

   var insNode = dijit.byId("Instrument");
   dojo.connect(insNode,"onChange",null,"set_instrument_event");
   var recNode = dijit.byId("Recipe");
   dojo.connect(recNode,"onChange",null,"set_recipe_event");
   testerNameInput.placeAt(generalPane.domNode);
   instInput.placeAt(generalPane.domNode);
   recipeInput.placeAt(generalPane.domNode);
   generalPane.recipename = "sph_ifs_master_dark";
   generalPane.insname = "IFS";
   return generalPane;	
}
function getSofTagList( ins, recipename ) {
    var stateStore = null;
    if ( ins == "IRDIS" ) {
        stateStore = new dojo.data.ItemFileReadStore({
            url: "recipes_irdis.json"
        });
    }
    if ( ins == "IFS" ) {
        stateStore = new dojo.data.ItemFileReadStore({
            url: "recipes_ifs.json"
        });
    }
    var list = stateStore.fetch({ query:{ name: recipename }, onComplete: fillSofTagList });    
}

function esorex_test_input() {
	var accordionPane = new dijit.layout.AccordionContainer({style: "width: 800px; height: 600px;"});
    var generalPane = GeneralPane_create();
    var sofPane = SOFPane_create(generalPane.insname,generalPane.recipename);
    var paramPane = new dijit.layout.ContentPane({title: "Parameters", content: "Hello!"});
    accordionPane.addChild(generalPane);
    accordionPane.addChild(sofPane);
    accordionPane.addChild(paramPane);
    document.body.appendChild(accordionPane.domNode);
    accordionPane.startup();   
}



dojo.addOnLoad(function() {
    esorex_test_input();
    });

