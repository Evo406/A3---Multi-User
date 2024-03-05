'use strict';

AFRAME.registerComponent('start-listener', {
    init: function () {
        let socket = io();
        var startButton = document.querySelector('#startButton');
        startButton.addEventListener('click', function () {
            // Emit an event to signal that the start button has been clicked
            socket.emit('p1_startClicked');

            // Hide the button and text locally
            startButton.setAttribute('visible', false);
            document.querySelector('a-text').setAttribute('visible', false);
        });

        //listen for user input events. We need to call checkWinner for every new event interaction
        socket.on('p1_choice', (data) => {
            p1_choice = data.choice;
            console.log('Player 1 chose: ' + p1_choice);
            checkWinner();

        });
    }
});