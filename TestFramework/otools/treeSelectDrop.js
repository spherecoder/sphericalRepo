/**
 * @author ole
 */
dojo.require("dijit.layout.AccordionContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dijit.Tree");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.tree.dndSource");
dojo.require("dojo.parser");
dojo.require("dojo.fx");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.Source");

function treeSelectDrop_dndAccept(source,nodes){
	if ( this.id == null ) return false;
    if (this.id.search("treeSelectDropTargetID") != -1) {
        var a = source.getItem(nodes[0].id).data;
        if ( a.isTreeNode == true ) {
        	if (a.isExpandable == false) {
        		return true;
        	}
        }
        else {
        	return true;
        }
        return false;
    }
    return false;
}
function treeSelectDrop_no_own_drop(sources,nodes,position) {
    if (source.id.search("treeSelectDropTargetID") != -1) {
        var a = source.getItem(nodes[0].id).data;
        if (a.isExpandable == false) {
            this.insertNodes(false, [a.label ]);
        }
    }
}

function treeSelectDrop_droppedIt(source,nodes,copy) {
    if (this.id.search("treeSelectDropTargetID") != -1) {
        var a = source.getItem(nodes[0].id).data;
        if ( a.isTreeNode == true ) {
        	if (a.isExpandable == false) {
                this.insertNodes(false, [a.label ]);
        		return true;
        	}
        }
        else {
            this.insertNodes(false, [a ]);
        	return true;
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
       checkItemAcceptance: treeSelectDrop_no_own_drop
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
        td2.style.border = "1px solid";
        td2.style.width = "200px";
        td2.style.height = "80px";
		var divel = document.createElement("div");
		divel.id = "categoryTarget" + i.toString();
        divel.category = categories[i].name;
        divel.style.width = "200px";
        divel.style.height = "80px";
        divel.style.overflow = "auto";
        td2.appendChild(divel);
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
    var saveButton = new dijit.form.Button();
    mainPane.addChild(filePane);
    mainPane.addChild(tagPane);
    mainPane.addChild(sofPane);
    tree.placeAt(filePane.domNode);
    treeSelectDrop_initCategories(categories);
    document.body.appendChild(mainPane.domNode);
    for (var i = 0; i < categories.length; i++) {
    	var el = document.getElementById("categoryTarget" + i.toString());
    	var dropTarget = new dojo.dnd.Source(el, {id: "treeSelectDropTargetID" + i.toString(), checkAcceptance: treeSelectDrop_dndAccept, onDrop: treeSelectDrop_droppedIt});
    	dropTarget.category = categories[i].name;
    }
    return mainPane;
}

