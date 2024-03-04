'use strict'

AFRAME.registerComponent('socket-color', {
    init : function() {
        let socket = io();
        let p1_choice = 0;
        let p2_choice = 0;

    socket.on('connect', (userData) => {
        console.log('I exist in the network, yay!');

        document.querySelector('#rock_button').addEventListener('click', function(e) {
            socket.emit('p1_rock');
     });

        document.querySelector('#paper_button').addEventListener('click', function(e) {
            socket.emit('p1_paper');
        });

        document.querySelector('#scissors_button').addEventListener('click', function(e) {
            socket.emit('p1_scissors');
        });

        // //listen for custom color_change event
        // socket.on('color_change', (data) => {
        //     //make a css color, then apply to the baackground of body
        //     let colorStr = 'rgb(' + data.r + ',' + data.g + ',' + data.b + ')';
        //     console.log('colour_cange: ' + colorStr);
        //     //document.body.style.backgroundColor = colorStr;
        //     document.querySelector('#scene-background').setAttribute("background", {color:colorStr});
        //     });

            //listen for user input events. We need to call checkWinner for every new event interaction
            socket.on('p1_choice', (data) => {
                p1_choice = data.choice;
                console.log('Player 1 chose: ' + p1_choice);
                checkWinner();

            });

            socket.on('p2_choice', (data) => {
                p2_choice = data.choice;
                console.log('Player 2 chose: ' + p2_choice);
                checkWinner();
            });



        });

        // Function checks to see if both players selected an option
        function checkWinner() {
            // if both players chose an input, determine the winner
            if(p1_choice != 0 && p2_choice != 0) {
                console.log("Asses winner");
            }
            else {
                console.log("Still awaiting user input");
            }
        }
    }
});