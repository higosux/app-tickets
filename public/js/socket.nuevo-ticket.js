// Command for 

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Server connected');
});

socket.on('disconnect', function() {
    console.log('Server disconnected');
});

socket.on('actualState', function(actualState) {
    label.text(actualState.actual);

});

$('button').on('click', function() {

    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });

});