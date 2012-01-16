dojo.require("dojox.widget.SortList");
dojo.require("dijit.form.Textarea");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.form.MultiSelect");

function awindow() {
	var borderPane = new dijit.layout.BorderContainer({style: "width: 500px; height: 300px; background-color: #aaaaaa;"});
	var listPane = new dijit.layout.ContentPane({content: "<p>list</p>", region: "leading", style: "width: 40%"});
	var assignPane = new dijit.layout.ContentPane({content: "<p>assign</p>", region: "center", style: "width: 10%"});
	var rightPane = new dijit.layout.ContentPane({content: "<p>right</p>", region: "right"});
    borderPane.addChild(listPane);
    borderPane.addChild(assignPane);
    borderPane.addChild(rightPane);
	var listdoc = load_content("test/test_xml.xml");
	var list = listdoc.getElementsByTagName("testit");
	var listsel = new dijit.form.MultiSelect();
	listsel.placeAt(listPane.domNode);
	var n = 1;
	for (var i = 0; i < list.length; i++) {
		var c = document.createElement('option');
		c.innerHTML = list[i].firstChild.nodeValue;
		c.value = n++;
		listsel.domNode.appendChild(c);
	}
    document.body.appendChild(borderPane.domNode);
    borderPane.startup();   
}



dojo.addOnLoad(function() {
	awindow();
    });

