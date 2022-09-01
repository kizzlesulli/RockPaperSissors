//Change intro HTML to cancel game HTML

function cancelGame(scenario, buttonRight, resultsText) {

    scenario.innerText = 'The unhinged rock paper scissors enthusiast chose scissors...';
    
    buttonRight.classList.remove('cancel')
    buttonRight.classList.add('chose');;
    resultsText.innerText = 'Hope you run fast...';
}

//Change intro HTML to ask number of rounds HTML

function askNumberRounds(scenario, buttonLeft, buttonRight) {

    scenario.innerText = 'How many games do you want to play?';
    
    buttonLeft.innerHTML = '<input class="get-rounds" type="number" step="2" min="3" value="3">';
    buttonLeft.classList.remove('play');
    buttonLeft.classList.add('number-rounds');
    buttonRight.innerText = 'START';
    buttonRight.classList.remove('cancel')
    buttonRight.classList.add('start');;
}

//Change ask number of rounds HTML to start game HTML

let numberOfRounds;

function startGame(scenario, buttonLeft, buttonRight, resultsText, roundNumber) {

    scenario.remove();
    buttonLeft.innerText = '';
    buttonRight.innerText = '';
    resultsText.innerText = '';
    roundNumber.innerText = 'Round 1';

    let playerResults = document.querySelector('.player-results');
    let computerResults = document.querySelector('.computer-results');
    let playerSelection = document.querySelector('.player-selection');

    playerResults.innerHTML = '';
    computerResults.innerHTML = '';

    playerResults.innerHTML = `
        <div class="player-name">Distressed Defender</div>
        <div class="player-score">0</div>
        <p></p>
        <div class="box player-choice"></div>
    `;

    computerResults.innerHTML = `
        <div class="computer-name">Unhinged Enthusiast</div>
        <div class="computer-score">0</div>
        <p></p>
        <div class="box computer-choice"></div>
    `;

    playerSelection.innerHTML = `
        <div class="selection-text">How will you defend yourself?</div>
        <div class="selection-boxes">
            <div class="selection box rock">Rock</div>
            <div class="selection box paper">Paper</div>
            <div class="selection box scissors">Scissors</div>
        </div>
    `;
}


//Random number between 0 and 2

function getRandThree() {
    return Math.floor(Math.random() * 3)
}

//Get player choice of Rock, Paper, or Scissors
//Make sure it is Rock, Paper, or Scissors
//Ask to choose again if it isn't and take that choice

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

    switch (n) {
        case 0: 
            console.log('Computer chooses Rock.');
            return 'Rock';
        case 1:
            console.log('Computer chooses Paper.');
            return 'Paper';
        case 2:
            console.log('Computer chooses Scissors.');
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

function playGame(num) {

    for(i = 0; i < num; i++) {

        console.log(`Round ${i + 1}`)

        let playerChoice = getPlayerChoice();
        let computerChoice = getComputerChoice();

        playRound(playerChoice, computerChoice);
    }

    console.log(`That\'s ${i} rounds. Thanks for playing.`)
}

//playGame(numberOfGames);

const topBoxes = document.querySelectorAll('.box');
topBoxes.forEach(box => box.addEventListener('click', (e) => {

    console.log(e.target);

    let scenario = document.querySelector('.scenario');
    let buttonLeft = document.querySelector('.box.top-left');
    let buttonRight = document.querySelector('.box.top-right');
    let resultsText = document.querySelector('.results-text');
    let roundNumber = document.querySelector('.round-number');

    if(e.target.classList.contains('cancel')) {
        cancelGame(scenario, buttonRight, resultsText);

    } else if(e.target.classList.contains('play')) {
        askNumberRounds(scenario, buttonLeft, buttonRight);

    } else if (e.target.classList.contains('start')) {
        
        numberOfRounds = document.querySelector('.get-rounds').value;
        startGame(scenario, buttonLeft, buttonRight, resultsText, roundNumber);
        //playGame(numberOfRounds);
    }

}));


//window.addEventListener('click', e => console.log(e.target));