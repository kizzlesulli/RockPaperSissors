
//Let player know what they are playing
//Ask how many games they want to play

const numberOfGames = prompt('Let\'s play rock, paper, scissors! How many rounds do you want to play?');

//Get random number between 0 and 2 and assign to variable

function getRandThree() {
    return Math.floor(Math.random() * 3)
}

//Get player choice of Rock, Paper, or Scissors
//Check that player choice is Rock, Paper or Scissors
//Ask to choose again if it isn't

function getPlayerChoice() {

    let choice = prompt('Choose rock, paper, or scissors!').toLowerCase();

    while (!(choice == 'rock' || choice == 'paper' || choice == 'scissors')) {

        choice = prompt('That isn\'t paper, scissors, or a rock. Please choose again!').toLowerCase();
    }

    if (choice == 'rock') {
        
        console.log('You choose Rock.');
    
    } else if (choice == 'paper') {
        
        console.log('You choose Paper.');
    
    } else if (choice == 'scissors') {
        
        console.log('You choose Scissors.');
    }
    
    return choice.charAt(0).toUpperCase() + choice.slice(1);
}

//Get computer choice of Rock, Paper, or Scissors

function getComputerChoice() {
    
    let n = getRandThree();

    if (n == 0) {
        console.log('Computer chooses Rock.');
        return 'Rock';
   
    } else if (n == 1) {
        console.log('Computer chooses Paper.');
        return 'Paper';
   
    } else if (n == 2) {
        console.log('Computer chooses Scissors.');
        return 'Scissors';
    }
}

//Play a round of Rock, Paper, Scissors
//Check player vs computer choice
//Declare winner

function playRound(player, computer) {

    if (player == computer) {
        
        console.log(`It\'s a tie! You both chose ${player}.`);
    
    } else if ((player == 'Rock' && computer == 'Scissors') ||
                (player == 'Paper' && computer == 'Rock') ||
                (player == 'Scissors' && computer == 'Paper')) {
        
        console.log(`You win! ${player} beats ${computer}`); 
    
    } else if ((computer == 'Rock' && player == 'Scissors') ||
                (computer == 'Paper' && player == 'Rock') ||
                (computer == 'Scissors' && player == 'Paper')) {
        
        console.log(`You Lose! ${computer} beats ${player}`);  
    }
}

//Start the game and iterate rounds
//Let player know game is over

function startGame(num) {

    for(i = 0; i < num; i++) {

        console.log(`Round ${i + 1}`)

        let playerChoice = getPlayerChoice();
        let computerChoice = getComputerChoice();

        playRound(playerChoice, computerChoice);
    }

    console.log(`That\'s ${i} rounds. Thanks for playing.`)
}

startGame(numberOfGames);