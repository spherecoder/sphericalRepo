/**
 * @author ole
 */
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.form.Button");


function initialSelection_new( createNew, browse, el ) {
    //var mainPane = new dijit.layout.BorderContainer({title: titlein, style: "width: 500px;",id: "bordCont"});
	var mainPane = dojo.create("div",{
		id: "initialSelect_mainPane",
		style: {
			width: "200px",
			height: "70px",
			border: "2px solid",
			padding: "5px"
		}
	},el );
    var createButton = new dijit.form.Button({ style: "position: absolute; top: 10px; left: 10px;", label: "CreateNew", showLabel: false, iconClass: "otoolsCreateIcon nooff", onClick: createNew});
    var browseButton = new dijit.form.Button({ style: "position: absolute; top: 10px; left: 140px;", label: "Browse", showLabel: false, iconClass: "otoolsBrowseIcon nooff", onClick: browse});
	createButton.placeAt(mainPane);
	browseButton.placeAt(mainPane);
	return mainPane;
}
