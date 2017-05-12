var SerialPort = require('serialport');
var port = new SerialPort('dev/ttyAMA0', {
	baudRate: 9600,
	dataBits: 8,
	stopBits: 1,
	parity: 'even'
});

port.on('open', () => {

	console.log('Porta aberta');
})

port.write([85], (err) => {

	if (err) { return console.log('Erro: ', err.message) }
		console.log('mensagem escrita');

	
})