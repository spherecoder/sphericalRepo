/**
 * @author ole
 */
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

function treeSelectDrop_droppedIt(source,nodes,copy) {
    if (this.id.search("dropt") != -1) {
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
       dndController: "dijit.tree.dndSource"
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
        var dropTarget = new dojo.dnd.Target(td2, {id: "treeSelectDropTargetID" + i.toString(), checkAcceptance: dndAccept, onDrop: droppedIt} );
        tr.appendChild(td);
        tr.appendChild(td2);
        tab.appendChild(tr);
    };
    tabdiv.appendChild(tab);
    catPane.set("content",tabdiv.innerHTML);
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

function SOFPane_create(insname,recipename) {
    var mainPane = new dijit.layout.BorderContainer({title: "Esorex SOF", style: "width: 800px;", design: "sidebar", gutters: "false", id: "bordCont"});
    var filePane = new dijit.layout.ContentPane({region: "left", splitter: "false", style: "width: 350px;"});
    var tagPane = new dijit.layout.ContentPane({region: "center"});
    var sofPane = new dijit.layout.ContentPane({id: "sofPane", region: "right", splitter: "false", style: "width: 350px;"});
    var tree = treeSelectDrop_fileSelect_tree("countries.json", {"type": "continent"}, "Continents");
    mainPane.addChild(filePane);
    mainPane.addChild(tagPane);
    mainPane.addChild(sofPane);
    tree.placeAt(filePane.domNode);
    var tagslist = getSofTagList(insname,recipename);
    return mainPane;
}

