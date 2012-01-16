/**
 * @author ole
 */
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.form.Button");

function testcaseBrowser_destroy() {
	var el = dojo.byId("testcaseBrowser_mainPane");
	if (el) {
		dojo.destroy(el);
	}
}
function testcaseBrowser_select() {
	var sel = dijit.byId("testcaseBrowser_mainPane");
}

function testcaseBrowser_populate(pane,testcase) {
	dojo.create("div", {innerHTML: "General:", style: {font: "20px italic",marginBottom: "5px"}},pane.domNode);
	var tabgen = dojo.create("table", null, pane.domNode);
	var tr = dojo.create("tr",null,tabgen);
	dojo.create("td", {innerHTML: "Test ID:", style: {}},tr);
	dojo.create("td", {innerHTML: testcase.testid, style: {}},tr);
	var tr = dojo.create("tr",null,tabgen);
	dojo.create("td", {innerHTML: "Recipe:", style: {}},tr);
	dojo.create("td", {innerHTML: testcase.recipe, style: {}},tr);
	var tr = dojo.create("tr",null,tabgen);
	dojo.create("td", {innerHTML: "Responsible:", style: {}},tr);
	dojo.create("td", {innerHTML: testcase.responsible, style: {}},tr);
	var tr = dojo.create("tr",null,tabgen);
	dojo.create("td", {innerHTML: "Date:", style: {}},tr);
	dojo.create("td", {innerHTML: testcase.date.toString(), style: {}},tr);
	var tr = dojo.create("tr",null,tabgen);
	dojo.create("td", {innerHTML: "Version:", style: {}},tr);
	dojo.create("td", {innerHTML: testcase.version, style: {}},tr);
	var tr = dojo.create("tr",null,tabgen);
	dojo.create("td", {innerHTML: "Get Mail:", style: {}},tr);
	dojo.create("td", {innerHTML: testcase.getmail.toString(), style: {}},tr);

	dojo.create("div", {innerHTML: "Esorex SOF:", style: {font: "20px italic",marginBottom: "5px"}},pane.domNode);
	var tab = dojo.create("table", null, pane.domNode);
	if ( testcase.sof != undefined ) {
		for ( var i = 0; i < testcase.sof.length; i++) {
			var tr = dojo.create("tr",null,tab);
			var td = dojo.create("td",{style: "border: 1px solid"},tr);
			td.innerHTML = testcase.sof[i].tag+":";
			var td2 = dojo.create("td",null,tr);
			td2.innerHTML = testcase.sof[i].filename;
		}
	}
	dojo.create("div", {innerHTML: "Parameters:", style: {font: "20px italic", marginBottom: "5px"}},pane.domNode);
	var tab = dojo.create("table", null, pane.domNode);
	if ( testcase.parameters != undefined ) {
		for ( var i = 0; i < testcase.parameters.length; i++) {
			var tr = dojo.create("tr",{style: "border: 1px solid"},tab);
			var td = dojo.create("td",{style: "border: 1px solid"},tr);
			td.innerHTML = testcase.parameters[i].param+":";
			var td2 = dojo.create("td",null,tr);
			td2.innerHTML = testcase.parameters[i].value;
		}
	}
	dojo.create("div", {innerHTML: "Verifications:", style: {font: "20px italic",marginBottom: "5px"}},pane.domNode);
	var tab = dojo.create("table", null, pane.domNode);
	if ( testcase.verifications != undefined ) {
		for ( var i = 0; i < testcase.verifications.length; i++) {
			var tr = dojo.create("tr",null,tab);
			var td = dojo.create("td",{style: "border: 1px solid"},tr);
			td.innerHTML = testcase.verifications[i].tag+":";
			var td2 = dojo.create("td",null,tr);
			td2.innerHTML = testcase.verifications[i].filename;
			var td3 = dojo.create("td",null,tr);
			td3.innerHTML = testcase.verifications[i].scriptname;
		}
	}
	dojo.create("div", {innerHTML: "Description:", style: {font: "20px italic",marginBottom: "5px"}},pane.domNode);
	dojo.create("div", {innerHTML: testcase.description, style: {width: "300px", height: "100px", border: "1px solid"}},pane.domNode);
}

function testcaseBrowser_new( titlein, testcase, callback ) {
    //var mainPane = new dijit.layout.BorderContainer({title: titlein, style: "width: 500px;",id: "bordCont"});
	var mainPane = dojo.create("div",{
		id: "testcaseBrowser_mainPane",
		style: {
			width: "500px",
			height: "500px",
			border: "2px solid",
			padding: "5px"
		}
	},dojo.body());
    var browsePane = new dijit.layout.ContentPane({style: "width: 350px;height: 500px;"});
    testcaseBrowser_populate(browsePane,testcase);
    var closeButton = new dijit.form.Button({ style: "position: absolute; top: 10px; left: 440px;", label: "Close", showLabel: false, iconClass: "otoolsCloseIcon nooff", onClick: testcaseBrowser_destroy});
    var openButton = new dijit.form.Button({ style: "position: absolute; top: 440px; left: 440px;", label: "Edit", showLabel: false, iconClass: "otoolsEditIcon nooff", onClick: testcaseBrowser_select});
	openButton.callback = callback;
	closeButton.placeAt(mainPane);
	openButton.placeAt(mainPane);
	browsePane.placeAt(mainPane);
	//mainPane.addChild(otPane);
    //document.body.appendChild(mainPane.domNode);
	return mainPane;
}
