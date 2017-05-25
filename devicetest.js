var altimetro = require('./devices/altimetro');

const sp = require("serialport");
//const Buffer = require('safe-buffer').Buffer;

//const largeMessage = Buffer.from(1024*10).fill('!');
var buffer = new Buffer(3);
buffer[0] = 0x85; // sobe
buffer[1] = 0x77; // mede
buffer[2] = 0x90; // calibra
buffer[3] = 0x83; //ack
var port = new sp('/dev/ttyAMA0', {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none'
});
 port.on('open', (err) => {
            if (err) {
                return console.log('Test: erro open - ', err.message);
            } else {
                console.log('Test: Porta aberta');
            }
        })
function envia(msg) {
    if (port.isOpen()) {
        port.write(msg, (err) => {
            if (err) {
                return console.log('Test: erro envia msg - ', err.message, 'mensagem: ', msg)
            } else console.log('enviado com sucesso: ', msg);
        })
    } else console.log('Porta nao aberta!');
}
function recebe() {
    port.on('data', (data) => {
        console.log('recebido: \t', data);
        return data;
    });
}

//if (recebe()==85) envia(85);
setTimeout(function() {
    var rx = recebe();
    if (rx == buffer[0]) {
        setInterval(function() {
            envia(buffer[0]);
        }, 5000);
    }
}, 5000);
//setInterval(function() { envia(85); }, 3000);
altimetro.opensp();
altimetro.sobe();

