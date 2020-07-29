const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        console.log(`Siguiente ticket: ${siguiente} `);

        callback(siguiente);
    });

    //emitir evento estadoActual

    client.emit('actualState', {
        actual: ticketControl.getLastTicket(),
        ultimos4: ticketControl.getLast4()
    });

    client.on('attentionTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        }

        let attentionTicket = ticketControl.atenderTicket(data.escritorio);

        callback(attentionTicket);

        // actualizar - notificar cambios en los ultimos 4 
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getLast4
        });
        //
    });

});