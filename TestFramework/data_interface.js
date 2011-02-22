/**
 * @author ole
 */
dojo.require("dijit.Dialog");

var server = "http://localhost"
function data_interface_message( message ) {
	var waitDialog = new dijit.Dialog({
		title: "Data interface", 
		content: message, 
		style: "width: 200px; height: 200px;"}
	);
	return waitDialog;
}



function data_interface_load_testlist(el,callb) {  
	var waitmessage = data_interface_message("Waiting...");
	waitmessage.show();
	var xhrArgs = {
        url: server + "/sph/TestFramework/php/data_interface.php",
        handleAs: "json",
        load: function(data) {
			waitmessage.destroyRecursive(false);
			el.testlist = data;
			callb();
        },
        error: function(error) {
			//var errmessage = data_interface_message("An error occured.");
			waitmessage.set("content","An erorr occured: " + error);
        }
    }
	var deferred = dojo.xhrGet(xhrArgs);
	return deferred;
}

function data_interface_load_testcase(testid, callb) {  
	var waitmessage = data_interface_message("Waiting...");
	waitmessage.show();
	var xhrArgs = {
        url: server + "/sph/TestFramework/php/data_interface_get_test.php?testid=" + testid,
        handleAs: "json",
        load: function(data) {
			waitmessage.destroyRecursive(false);
			callb(data);
        },
        error: function(error) {
			//var errmessage = data_interface_message("An error occured.");
			waitmessage.set("content","An erorr occured: " + error);
        }
    }
	var deferred = dojo.xhrGet(xhrArgs);
	return deferred;
}
