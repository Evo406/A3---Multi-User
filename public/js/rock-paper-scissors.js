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
                if (data.state == 1){ // Player 1 Wins
                    // Set player1 bg to green
                    document.querySelector('#scene-background').setAttribute("background", {color:green});
                    console.log("Player 2 Wins.");
                }
                else if(data.state == 2) { // Player 2 Wins
                    // Set player 2 bg to red
                    document.querySelector('#scene-background').setAttribute("background", {color:red});
                    console.log("Player 2 Wins.");

                }
                else if(data.state == 3){ // Tie
                    document.querySelector('#scene-background').setAttribute("background", {color:grey});
                    console.log("Tied. Please try again.");

                }
                
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
                    socket.io.emit("tie")
                }
                else if (p1_choice == "1" && p2_choice == "3") {
                    console.log("Rock beats Scissors");
                    socket.io.emit('p1_win');
                }
                else if (p1_choice == 2 && p2_choice == 1) {
                    console.log("Paper beats Rock");
                    socket.io.emit('p1_win');
                }
                else if (p1_choice == 3 && p2_choice == 2) {
                    console.log("Scissors beats Paper");
                    socket.io.emit('p1_win');
                }
                
                // In any other case, P2 wins
                else {
                    socket.io.emit('p2_win');
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