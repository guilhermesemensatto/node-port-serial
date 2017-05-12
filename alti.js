var SerialPort = require('serialport');
var port = new SerialPort('dev/ttyAMA0', {
	baudRate: 9600,
	dataBits: 8,
	stopBits: 1,
	parity: 'even'
});