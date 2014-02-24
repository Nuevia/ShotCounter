/**
 * 
 */

environment = {};
var messages = [];
var socket;
    
function showMessage(msg) {
	messages.push(msg);
	 var html = '';
     for(var i=0; i<messages.length; i++) {
         html += messages[i] + '<br />';
     }
     content.innerHTML = html;
	
}
window.onload = function() {
    
    socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    
    var content = document.getElementById("content");
 
    socket.on('message', function (data) {
        console.log(data);
    	if(data.message) {
           showMessage(data.message);
           
        } else {
            console.log("There is a problem:", data);
        }
    });
    
    // When we receive new environment info from the server
    socket.on('environment', function (data) {
    	// Store it in the environment var
    	environment=data;
    	// Clear previous entries in the "COM Ports" dropdown
    	$('#cbxComPorts option').remove();  
    	msg = "Available COM ports: ";
    	for (i=0; i < environment.available_ports.length; i++) {
    		p = environment.available_ports[i];
    		msg += p["comName"] + ",";
    		// Create new item for "COM ports" dropdown
    		$('#cbxComPorts').append("<option value='" + p["comName"] + "'>" + p["comName"] + "</option>");
    		
    	}
    	// Show 'available com ports' in the log window
    	showMessage(msg);
    	
    	// Update the "COM Ports" dropdown with these ports
    	
    	
    });
    
    // User is sending a message to server
    $('#btnSendMessage').click(function() {
    	var text = $('#txtMessage').val();
    	if (text) {
    		socket.emit('message', { message: text });
    	}
        
    });
    
    // User is requesting to connect to a com port
    $('#btnConnect').click(function() {
    	var comPort = $('#cbxComPorts').val();
    	socket.emit('connect', {port: comPort});
    });
 
}