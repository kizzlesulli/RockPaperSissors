const divs = {
    roundNumber: document.querySelector('.round-number'),
    buttonLeft: document.querySelector('.box.top-left'),
    buttonRight: document.querySelector('.box.top-right'),
    playerResults: document.querySelector('.player-results'),
    playerName: document.querySelector('.player-name'),
    playerScore: document.querySelector('.player-score'),
    playerText: document.querySelector('.player-results > p'),
    computerResults: document.querySelector('.computer-results'),
    computerName: document.querySelector('.computer-name'),
    computerScore: document.querySelector('.computer-score'),
    computerText: document.querySelector('.computer-results > p'),
    resultsText: document.querySelector('.results-text'),
    playerSelection: document.querySelector('.player-selection'),
}

//Change intro HTML to cancel game HTML

function cancelGame() {

    divs.roundNumber.innerText = 'The unhinged rock paper scissors enthusiast chose scissors...';
    
    divs.buttonRight.classList.remove('cancel')
    divs.buttonRight.classList.add('chose');;
    divs.resultsText.innerText = 'Hope you run fast...';
}

//Change intro HTML to ask number of rounds HTML

function askNumberRounds() {

    //Removes highlight if deciding to play after canceling
    divs.buttonRight.classList.remove('chose');;
    
    divs.resultsText.innerText = '';
    divs.roundNumber.innerText = 'How many rounds do you want to play?';
    
    divs.buttonLeft.innerHTML = '<input class="get-rounds" type="number" step="2" min="3" value="3">';
    divs.buttonLeft.classList.remove('play');
    divs.buttonLeft.classList.add('number-rounds');
    divs.buttonRight.innerText = 'Start';
    divs.buttonRight.classList.remove('cancel')
    divs.buttonRight.classList.add('start');;
}

//Change ask number of rounds HTML to start game HTML

function startGame() {

    divs.roundNumber.classList.remove('scenario');
    divs.roundNumber.innerText = 'Round 1';
    
    divs.buttonLeft.innerHTML = '';
    divs.buttonLeft.classList.remove('number-rounds');
    divs.buttonLeft.classList.add('player-choice');
    
    divs.buttonRight.innerText = '';
    divs.buttonRight.classList.remove('start');
    divs.buttonRight.classList.add('computer-choice');
    
    divs.resultsText.innerText = '';

    divs.playerName.innerText = 'Distressed Defender';
    divs.playerScore.innerText = '0';
    divs.playerText.innerText = 'You chose...';

    divs.computerName.innerText = 'Unhinged Enthusiast';
    divs.computerScore.innerText = '0';
    divs.computerText.innerText = 'They chose...';

    //selection-box event listeners added in playGame function 
    //player-selection innerHTML doesn't need to persist
    divs.playerSelection.innerHTML = `
        <div class="selection-text">How will you defend yourself?</div>
        <div class="selection-boxes">
            <div class="selection box rock">Rock</div>
            <div class="selection box paper">Paper</div>
            <div class="selection box scissors">Scissors</div>
        </div>
    `;
}

function endGame () {

    let selectionText = document.querySelector('.selection-text');
    let buttonRock = document.querySelector('.box.rock');
    let buttonPaper = document.querySelector('.box.paper');
    let buttonScissors = document.querySelector('.box.scissors');

    buttonRock.remove();
    buttonScissors.remove();
    buttonPaper.classList.remove('paper');
    buttonPaper.classList.add('play-again');
    selectionText.innerText = 'It does\'t look like they are going to leave you alone...';
    buttonPaper.innerText = 'Play again?';
}


//Play game/round variables
let currentRound = 1;
let playerScore = 0;
let computerScore = 0;

function clearGame() {

    currentRound = 1;
    playerScore = 0;
    computerScore = 0;

    divs.playerSelection.innerHTML = '';

    divs.playerName.innerText = '';
    divs.playerScore.innerText = '';
    divs.playerText.innerText = '';

    divs.computerName.innerText = '';
    divs.computerScore.innerText = '';
    divs.computerText.innerText = '';
}

function playAgain () {

    clearGame();

    divs.roundNumber.classList.add('scenario');
    divs.buttonRight.classList.add('start');
    
    askNumberRounds();
}

//Functions for playing the game and rounds

function updateGameDisplay(playerChoice, computerChoice, results) {
    divs.buttonLeft.innerText = playerChoice;
    divs.buttonRight.innerText = computerChoice;
    divs.resultsText.innerText =  results;
    divs.playerScore.innerText = playerScore;
    divs.computerScore.innerHTML = computerScore;
}

function getRandThree() {
    return Math.floor(Math.random() * 3)
}

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
}

function getResults (player, computer) {

    if (player == computer) {
        
        return `Round ${currentRound} is a a tie! You both chose ${player}.`;
    
    } else if ((player == 'Rock' && computer == 'Scissors') ||
                (player == 'Paper' && computer == 'Rock') ||
                (player == 'Scissors' && computer == 'Paper')) {
        
        playerScore++;
        return `You win Round ${currentRound}! ${player} beats ${computer}`; 
    
    } else if ((computer == 'Rock' && player == 'Scissors') ||
                (computer == 'Paper' && player == 'Rock') ||
                (computer == 'Scissors' && player == 'Paper')) {
        
        computerScore++;
        return `You Lose Round ${currentRound}! ${computer} beats ${player}`;  
    }
}

function decideWinner() {

    if (playerScore > computerScore) {

        return 'You won! The unhinged enthusiast begins to question their life choices.'

    } else if (playerScore < computerScore) {

        return 'You lost... The unhinged enthusiast isn\' putting away their scissors.'
    } else if (playerScore == computerScore) {

        return 'It\'s a tie. The unhinged enthusiast doesn\'t appear to accept this result.'
    }
}

function playRound (evt, lastRound) {

    let computerChoice;
    let playerChoice;

    playerChoice = evt.target.innerText;
    computerChoice = getComputerChoice();
    results = getResults(playerChoice, computerChoice);

    updateGameDisplay(playerChoice, computerChoice, results);

    if (!lastRound) {

        currentRound++
        divs.roundNumber.innerText = `Round ${currentRound}`;
    
    } else if (lastRound) {
    
        divs.roundNumber.innerText = decideWinner();
    }
}

function playGame(numberOfRounds) {

    const selectionBoxes = document.querySelectorAll('.selection.box');
    selectionBoxes.forEach(box => box.addEventListener('click', (e) => {

        if (e.target.classList.contains('play-again')) {
           
            playAgain();
        
        } else if (currentRound < numberOfRounds) { 
            
            //Last round is false
            playRound(e, false);

        } else {
        
            //Play last round; last round is true
            playRound(e, true);

            //Asks to play again
            endGame();
        }
    }));
}

function handleTopButtonInput (evt) {

    if(evt.target.classList.contains('cancel')) {
        cancelGame();

    } else if(evt.target.classList.contains('play')) {
        askNumberRounds();

    } else if (evt.target.classList.contains('start')) {
        
        console.log(evt.target);

        let numberOfRounds = document.querySelector('.get-rounds').value;
        
        startGame();
        playGame(numberOfRounds);
    }
}

const topBoxes = document.querySelectorAll('.box');
topBoxes.forEach(box => box.addEventListener('click', handleTopButtonInput));