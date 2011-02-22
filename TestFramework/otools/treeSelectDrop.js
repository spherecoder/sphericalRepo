/**
 * @author ole
 */
dojo.require("dijit.layout.AccordionContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dijit.Tree");
dojo.require("dijit.tree.dndSource");
dojo.require("dojo.parser");
dojo.require("dojo.fx");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.Source");

function treeSelectDrop_dndAccept(source,nodes){
    if (this.id.search("treeSelectDropTargetID") != -1) {
        var a = source.getItem(nodes[0].id).data;
        if (a.isExpandable == false) {
            return true;
        }
        return false;
    }
    return false;
}
function treeSelectDrop_no_own_drop(sources,nodes,position) {
	return false;
}
function treeSelectDrop_droppedIt(source,nodes,copy) {
    if (this.id.search("treeSelectDropTargetIdD") != -1) {
        var a = source.getItem(nodes[0].id).data;
        if (a.isExpandable == false) {
            this.insertNodes(false, [a.label ]);
        }
    }
}
function treeSelectDrop_fileSelect_tree(urlin,queryin,rootLabelin) {
   var store = new dojo.data.ItemFileWriteStore({
        url: urlin
   });
   var treeModel = new dijit.tree.ForestStoreModel({
        store: store,
        query: queryin,
        rootId: "root",
        rootLabel: rootLabelin,
        childrenAttrs: ["children"]
   });
   
   var tree = new dijit.Tree({
       model: treeModel,
       dndController: dijit.tree.dndSource,
       checkItemAcceptance: treeSelectDrop_no_own_drop,
       dndParams: {checkAcceptance: treeSelectDrop_dndAccept,
	   checkItemAcceptance: treeSelectDrop_no_own_drop,
	   onDndDrop: treeSelectDrop_droppedIt,
	   onDrop: treeSelectDrop_droppedIt},
	   onDndDrop: treeSelectDrop_droppedIt,
	   onDrop: treeSelectDrop_droppedIt
   });
   return tree;
}

function treeSelectDrop_initCategories(categories) {
    var catPane = dijit.byId("catPane");
    if ( catPane == null ) {
        alert("Error in treeSelectDrop_initCategories. No catPane.");
		return;
    }
    dojo.destroy(dojo.byId("cattable"));
    var tabdiv = document.createElement("div");
    var tab = document.createElement("table");
    tab.id = "cattable";
    for (var i = 0; i < categories.length; i++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.id = "categoryLabel" + i.toString();
        td.style.border = "1px dashed";
        td.style.width = "100px";
        td.style.height = "80px";
        td.innerHTML = categories[i].name;
        var td2 = document.createElement("td");
        td2.id = "categoryTarget" + i.toString();
        td2.style.border = "1px solid";
        td2.style.width = "100px";
        td2.style.height = "80px";
		td2.category = categories[i].name;
        //var dropTarget = new dojo.dnd.Target(td2, {id: "treeSelectDropTargetID" + i.toString(), checkAcceptance: treeSelectDrop_dndAccept, onDrop: treeSelectDrop_droppedIt} );
        tr.appendChild(td);
        tr.appendChild(td2);
        tab.appendChild(tr);
    };
    tabdiv.appendChild(tab);
    catPane.set("content",tabdiv.innerHTML);
}

function treeSelectDrop_new( titlein, urlin,queryin,rootLabelin, categories ) {
    var mainPane = new dijit.layout.BorderContainer({title: titlein, style: "width: 800px;", design: "sidebar", gutters: "false", id: "bordCont"});
    var filePane = new dijit.layout.ContentPane({region: "left", splitter: "false", style: "width: 350px;"});
    var tagPane = new dijit.layout.ContentPane({region: "center"});
    var sofPane = new dijit.layout.ContentPane({id: "catPane", region: "right", splitter: "false", style: "width: 350px;"});
    var tree = treeSelectDrop_fileSelect_tree(urlin, queryin, rootLabelin);
    mainPane.addChild(filePane);
    mainPane.addChild(tagPane);
    mainPane.addChild(sofPane);
    tree.placeAt(filePane.domNode);
    treeSelectDrop_initCategories(categories)
    //var tagslist = getSofTagList(insname,recipename);
    return mainPane;
}

dojo.addOnLoad(function() {
	var cats = [{
		name: "a"
	}];
    var ts = treeSelectDrop_new("Aha", "countries.json", {type: 'continent'},"rooty",cats);
    var accordionPane = new dijit.layout.AccordionContainer({style: "width: 800px; height: 600px;"});
    var generalPane = new dijit.layout.ContentPane({title: "General", content: "Hello!"});
    var sofPane =  new dijit.layout.ContentPane({title: "GSOFPane", content: "Hello!"});
    var paramPane = new dijit.layout.ContentPane({title: "Parameters", content: "Hello!"});
    accordionPane.addChild(generalPane);
    accordionPane.addChild(sofPane);
    accordionPane.addChild(paramPane);
    accordionPane.addChild(ts);
    document.body.appendChild(accordionPane.domNode);
    accordionPane.startup();   
    });
