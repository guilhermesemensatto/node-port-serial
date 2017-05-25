const sp = require("serialport")
const q = require('q')

var buffer = new Buffer(3);
buffer[0] = 0x85; // sobe
buffer[1] = 0x77; // mede
buffer[2] = 0x90; // calibra
buffer[3] = 0x83; //ack

var port = new sp('/dev/ttyUSB0', {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none'
});


function envia(msg) {
    if (port.isOpen()) {
        port.write(msg, (err) => {
            if (err) {
                return console.log('Altimetro: erro envia msg - ', err.message, 'mensagem: ', msg)
            } else console.log('enviado com sucesso: ', msg);
        })
    } else console.log('Porta nao aberta!');
}
function recebe() {
    port.on('data', function(data) {
        console.log('recebido: ', data);
        return data;
    })
}
function comando(codigo){
    var timer = setInterval(function() { envia(codigo); }, 3000);
    var rx = recebe();
		if (rx == codigo) {
        clearInterval(timer);
        return 1;
    }
}
var altimetro = {

    opensp: function() {
        port.on('open', (err) => {
            if (err) {
                return console.log('Altimetro: erro open - ', err.message);
            } else {
                console.log('Altimetro: Porta aberta');
            }
        })
        return 0;
    },

    sobe: function() {
        if (comando(buffer[0])==1) {
            if (comando(1)==1) {
				console.log('SUBIU');
                envia(buffer[3]);
            }
		}
    },
    mede: function() {
        if (comando(buffer[1]) == 1) {
            var medida = recebe();
            console.log('MEDIDA: ', medida);
            envia(buffer[3]);
            //return 1;
        }
    },

    calibra: function() {
        if (comando(buffer[2]) == 1) {
            if (comando(1) == 1) {
                console.log('CALIBRADO');
                envia(buffer[3]);
                //return 1;
            }
        }
    }
}

module.exports = altimetro;
