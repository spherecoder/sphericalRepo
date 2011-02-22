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
dojo.require("dijit.Dialog");
dojo.require("dijit.form.Button");

function treeSelect_destroy() {
	var el = dijit.byId("treeSelect_tree");
	if (el) {
		el.destroyRecursive(false);
	}
	var el = dojo.byId("treeSelect_mainPane");
	if (el) {
		dojo.destroy(el);
	}
}
function treeSelect_select() {
	var sel = dijit.byId("treeSelect_tree");
	if (sel) {
		if (sel.selectedNode != null) {
			if (sel.selectedNode.isExpandable == false ) {
				this.callback(sel.selectedNode);
			}
		}
	}
}

function treeSelect_fileSelect_tree(urlin,datain,queryin,rootLabelin) {
   var store = null;
   if (urlin != null) {
   	store = new dojo.data.ItemFileWriteStore({
   		url: urlin
   	})
   }
   else {
   	store = new dojo.data.ItemFileWriteStore({
   		data: datain
   	})
   };
   
   var treeModel = new dijit.tree.ForestStoreModel({
        store: store,
        query: queryin,
        rootId: "root",
        rootLabel: rootLabelin,
        childrenAttrs: ["children"]
   });
   
   var tree = new dijit.Tree({
   	id: "treeSelect_tree",
    model: treeModel
   });
   return tree;
}
function treeSelect_new( titlein, urlin, datain, queryin, rootLabelin, callback, el ) {
	var mainPane = dojo.create("div",{
		id: "treeSelect_mainPane",
		style: {
			width: "700px",
			height: "400px",
			border: "1px solid"
		}
	}, el);
    var treePane = new dijit.layout.ContentPane({style: "width: 600px;height: 400px;"});
    var tree = treeSelect_fileSelect_tree(urlin, datain, queryin, rootLabelin);
    var closeButton = new dijit.form.Button({ style: "position: absolute; top: 10px; left: 630px;", label: "Close", showLabel: false, iconClass: "otoolsCloseIcon nooff", onClick: treeSelect_destroy});
    var openButton = new dijit.form.Button({ style: "position: absolute; top: 330px; left: 630px;", label: "Open", showLabel: false, iconClass: "otoolsOpenIcon nooff", onClick: treeSelect_select});
	openButton.callback = callback;
	tree.placeAt(treePane.domNode);
	closeButton.placeAt(mainPane);
	openButton.placeAt(mainPane);
	treePane.placeAt(mainPane);
	return mainPane;
}

