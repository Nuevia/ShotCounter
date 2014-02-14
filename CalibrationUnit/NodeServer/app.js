/**
 * 
 */

var express = require("express"),
com = require("serialport");
var app = express();
var port = 3700;

// Serial-handling variables
var bufferedSensorData = "", sendData;

app.use(express.static(__dirname + '/public'));
 
app.get("/", function(req, res){
    res.send("It works!");
});

// Start listening for http and socket connections
var io = require('socket.io').listen(app.listen(port));


//Connect to unit via bluetooth com port
var serialPort = new com.SerialPort("COM5", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
  });

// Configure socket listener
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
    
    serialPort.on('open',function() {
        console.log('Connected to remote sensor unit.');
    	
    });
    
    serialPort.on('data', function(data) {
		//  console.log(data);  // log data to server console
		bufferedSensorData += data.toString();
		sendData = bufferedSensorData;
		bufferedSensorData = "";
		socket.emit('message', {message: sendData});
		console.log(sendData);
	});
});

// Set up serial handling
//serialListener(debug);



// List available com ports in server console
com.list(function (err, ports) {
	  ports.forEach(function(port) {
	    console.log(port.comName);
	    console.log(port.pnpId);
	    console.log(port.manufacturer);
	  });
	});




console.log("Listening on port " + port);