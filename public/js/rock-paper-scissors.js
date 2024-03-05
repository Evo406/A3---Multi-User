'use strict';

AFRAME.registerComponent('rock-paper-scissors', {
    init: function() {
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

            // Asses current state of the game
            socket.on('gameState', (data) => {
                let colorStr = '';
                if (data.state == 1){ // Player 1 Wins
                    colorStr = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ')'; // Green
                    console.log("Player 1 Wins.");
                }
                else if(data.state == 2) { // Player 2 Wins
                    colorStr = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')'; // Red
                    console.log("Player 2 Wins.");

                }
                else if(data.state == 3){ // Reset
                    colorStr = 'rgb(' + 50 + ',' + 50 + ',' + 50 + ')'; // Grey
                    console.log("Tied. Please try again.");
                }
                document.querySelector('#scene-background').setAttribute("background", {color:colorStr});

                // Reset background color after duration
                setTimeout(() => { 
                    document.querySelector('#scene-background').setAttribute("background", {color: 'white' });
                }, 5000); // 5 seconds
                });

                

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
                console.log("P1:", p1_choice);
                console.log("P2:", p2_choice);
                if(p1_choice == p2_choice){ // Tie
                    console.log("No winner. Please pick again");
                    socket.emit("reset");
                }
                else if (p1_choice == "1" && p2_choice == "3") {
                    console.log("Rock beats Scissors");
                    socket.emit('p1_win');
                }
                else if (p1_choice == "2" && p2_choice == "1") {
                    console.log("Paper beats Rock");
                    socket.emit('p1_win');
                }
                else if (p1_choice == "3" && p2_choice == "2") {
                    console.log("Scissors beats Paper");
                    socket.emit('p1_win');
                }
                
                // In any other case, P2 wins
                else {
                    socket.emit('p2_win');
                }

                // Reset both player choices 
                p1_choice = 0;
                p2_choice = 0;
            }
            else {
                console.log("Still awaiting user input");
            }
        }
    }
});