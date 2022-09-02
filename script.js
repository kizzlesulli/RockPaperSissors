//Change intro HTML to cancel game HTML

function cancelGame(roundNumber, buttonRight, resultsText) {

    roundNumber.innerText = 'The unhinged rock paper scissors enthusiast chose scissors...';
    
    buttonRight.classList.remove('cancel')
    buttonRight.classList.add('chose');;
    resultsText.innerText = 'Hope you run fast...';
}

//Change intro HTML to ask number of rounds HTML

function askNumberRounds(roundNumber, buttonLeft, buttonRight, resultsText) {

    resultsText.innerHTML = '';
    roundNumber.innerText = 'How many games do you want to play?';
    
    buttonLeft.innerHTML = '<input class="get-rounds" type="number" step="2" min="3" value="3">';
    buttonLeft.classList.remove('play');
    buttonLeft.classList.add('number-rounds');
    buttonRight.innerText = 'START';
    buttonRight.classList.remove('cancel')
    buttonRight.classList.add('start');;
}

//Change ask number of rounds HTML to start game HTML

let numberOfRounds;

function startGame(roundNumber, buttonLeft, buttonRight, playerSelection, resultsText) {

    roundNumber.classList.remove('scenario');
    roundNumber.innerText = 'Round 1';
    
    buttonLeft.innerHTML = '';
    buttonLeft.classList.remove('number-rounds');
    buttonLeft.classList.add('player-choice');
    
    buttonRight.innerText = '';
    buttonRight.classList.remove('start');
    buttonRight.classList.add('computer-choice');
    
    resultsText.innerText = '';

    let playerName = document.querySelector('.player-name');
    let playerScore = document.querySelector('.player-score');
    let playerText = document.querySelector('.player-results > p');

    playerName.innerText = 'Distressed Defender';
    playerScore.innerText = '0';
    playerText.innerText = 'You chose...';

    let computerName = document.querySelector('.computer-name');
    let computerScore = document.querySelector('.computer-score');
    let computerText = document.querySelector('.computer-results > p');

    computerName.innerText = 'Unhinged Enthusiast';
    computerScore.innerText = '0';
    computerText.innerText = 'They chose...';

    playerSelection.innerHTML = `
        <div class="selection-text">How will you defend yourself?</div>
        <div class="selection-boxes">
            <div class="selection box rock">Rock</div>
            <div class="selection box paper">Paper</div>
            <div class="selection box scissors">Scissors</div>
        </div>
    `;
}

//Get player choice of Rock, Paper, or Scissors
//Make sure it is Rock, Paper, or Scissors
//Ask to choose again if it isn't and take that choice

function getPlayerChoice(choice) {

    if (choice == 'Rock') {
        
        console.log('You choose Rock.');
    
    } else if (choice == 'Paper') {
        
        console.log('You choose Paper.');
    
    } else if (choice == 'Scissors') {
        
        console.log('You choose Scissors.');
    }
    
    return choice.charAt(0).toUpperCase() + choice.slice(1);
}

//Random number between 0 and 2

function getRandThree() {
    return Math.floor(Math.random() * 3)
}

//Get computer choice of Rock, Paper, or Scissors

function getComputerChoice() {
    
    let n = getRandThree();

    switch (n) {
        case 0: 
            return 'Rock';
        case 1:
            return 'Paper';
        case 2:
            return 'Scissors';
    }

    // if (n == 0) {
    //     console.log('Computer chooses Rock.');
    //     return 'Rock';
   
    // } else if (n == 1) {
    //     console.log('Computer chooses Paper.');
    //     return 'Paper';
   
    // } else if (n == 2) {
    //     console.log('Computer chooses Scissors.');
    //     return 'Scissors';
    // }
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

let i = 1;
let playerScore = 0;
let computerScore = 0;

function playGame(numberOfRounds, roundNumber, buttonLeft, buttonRight, resultsText) {

    let selectionText = document.querySelector('.selection-text');
    let selectionBoxesDiv = document.querySelector('.selection-boxes');
    let computerChoice;
    let playerChoice;

    const selectionBoxes = document.querySelectorAll('.selection.box')
    selectionBoxes.forEach(box => box.addEventListener('click', (e) => {

        if (i < numberOfRounds) {
            
            playerChoice = e.target.innerText;
            computerChoice = getComputerChoice();
            console.log(buttonLeft);
            buttonLeft.innerText = `${playerChoice}`;
            buttonRight.innerText = `${computerChoice}`;
            
            i++
            roundNumber.innerText = `Round ${i}`;

        } else {
            
        //Play last round
            computerChoice = getComputerChoice();

            buttonLeft.innerText = `${e.target.innerText}`;
            buttonRight.innerText = `${computerChoice}`;
            roundNumber.innerHTML = 'Game Over';

        //End game and ask to play again
            selectionText.innerText = 'It does\'t look like they are going to leave you alone...';
            selectionBoxesDiv.innerHTML = '<div class="selection box play-again">Play Again?</div>';

            if (e.target.classList.contains('play-again')) {
                i = 1;
                roundNumber.classList.add('scenario');
                askNumberRounds(roundNumber, buttonLeft, buttonRight);
            }
        }

    }))

    // for(i = 1; i < numberOfRounds; i++) {

    //     roundNumber.innerText = `Round ${i}`;

    //     let playerChoice = getPlayerChoice();
    //     let computerChoice = getComputerChoice();

    //     playRound(playerChoice, computerChoice);
    // }

    // console.log(`That\'s ${i} rounds. Thanks for playing.`)
}

//playGame(numberOfGames);

const topBoxes = document.querySelectorAll('.box');
topBoxes.forEach(box => box.addEventListener('click', (e) => {

    let roundNumber = document.querySelector('.round-number');
    let buttonLeft = document.querySelector('.box.top-left');
    let buttonRight = document.querySelector('.box.top-right');
    let resultsText = document.querySelector('.results-text');
    let playerSelection = document.querySelector('.player-selection');

    if(e.target.classList.contains('cancel')) {
        cancelGame(roundNumber, buttonRight, resultsText);

    } else if(e.target.classList.contains('play')) {
        askNumberRounds(roundNumber, buttonLeft, buttonRight, resultsText);

    } else if (e.target.classList.contains('start')) {
        
        numberOfRounds = document.querySelector('.get-rounds').value;
        startGame(roundNumber, buttonLeft, buttonRight, playerSelection, resultsText);
        playGame(numberOfRounds, roundNumber, buttonLeft, buttonRight, resultsText);
    }
}));


//window.addEventListener('click', e => console.log(e.target));