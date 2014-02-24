/**
 * 
 */

var express = require("express"),
com = require("serialport");
var app = express();
var port = 3700;
var environment = {};
var serialPort;

// Serial-handling variables
var bufferedSensorData = "", sendData;

app.use(express.static(__dirname + '/public'));
 
app.get("/", function(req, res){
    res.send("It works!");
});

// Start listening for http and socket connections
var io = require('socket.io').listen(app.listen(port));

//List available com ports in server console

/*

try {
	//Connect to unit via bluetooth com port
	var serialPort = new com.SerialPort("COM15", {
	    baudrate: 9600,
	    parser: com.parsers.readline('\r\n')
	  });
}
catch (e) {
	console.log(e);
}
*/

// Set up environment object
// Request a list of serial COM ports on server
com.list(function (err, ports) {
	environment.available_ports = ports;
	ports.forEach(function(port) {
		//environment.ports.push({"port": port.comName});
		//console.log(port.pnpId);
	 });
	 
 });



// Configure socket listener
io.sockets.on('connection', function (socket) {
    // Send welcome message
	socket.emit('message', { message: 'welcome to the chat' });
	// Send environment object to new client
	 socket.emit('environment', environment);
	
	// Handle control message from client to arduino
    socket.on('message', function (data) {
        io.sockets.emit('message', data);
    });
    
    /**
     *  User is telling the server to connect to a sensor on a specific com port
     */
    
    socket.on('connect', function(data) {
    	// {port: "COM10"}
    	//Connect to unit via bluetooth com port
    	serialPort = new com.SerialPort(data.port, {
    	    baudrate: 9600,
    	    parser: com.parsers.readline('\r\n')
    	  });
    	serialPort.on('open',function() {
            socket.emit('message', {message:'Connected to wireless sensor unit via ' + data.port});
        	
            serialPort.on('data', function(data) {
	    		//  console.log(data);  // log data to server console
	    		bufferedSensorData += data.toString();
	    		sendData = bufferedSensorData;
	    		socket.emit('message', {message: sendData});
	    		console.log(sendData);
	    		bufferedSensorData = "";
	    		
	    		
	    	});
        });
    	
	    	
    });
    
    
    
    /*
    
    
    serialPort.on('data', function(data) {
		//  console.log(data);  // log data to server console
		bufferedSensorData += data.toString();
		sendData = bufferedSensorData;
		bufferedSensorData = "";
		socket.emit('message', {message: sendData});
		console.log(sendData);
	});
	*/
});





console.log("Listening on port " + port);
