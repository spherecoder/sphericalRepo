/*
 * @brief Load the content of a XML file and return as a DOM
 * 
 * @param contenturl  the url of the XML file
 * 
 * This function loads the url as an XML/HTML file and returns
 * the content as a DOM.
 */
function load_content( contenturl ) {
    var doc = null;
    if ( document.implementation && document.implementation.createDocument ) {
        doc = document.implementation.createDocument(contenturl,"",null);
    }
    else {
        doc = new ActiveXObject("MSXML2.DOMDocument");
    }
    if ( doc == null ) {
        alert("Could not load the XML from " + contenturl);
		return null;
    }
    doc.async=false;
    doc.load(contenturl);
    if ( doc.firstChild == null ) {
        alert("There is no XML file " + contenturl + " or it does not contain any nodes!");
		return null;
    }
	return doc;
}

function test_load_content() {
	var doc = load_content("test_xml.xml");
	var els = doc.getElementsByTagName("testit");
	var n = new Number(els.length);
	if (n != 2) {
		alert("Failed -- not two elements");
		return;
	}
	if (els[1].getAttribute("blabb") != "Never") {
		alert("Failed -- wrong attribure");
		return;
	}
	alert("All OK!");
}
