// Grabbing elements from DOM
const startGameEl = document.querySelector('#game-start');
const difficultyEl = document.querySelector('#difficulty');
const instructions = document.querySelector('#instructions');
const pictureEl = document.querySelector('#image-holder');
const answersEl = document.querySelector('#answers');
const restartEl = document.querySelector('#restart');
const roundCounterEl = document.querySelector('#roundCounter');
const currentHighscoreEl = document.querySelector('#current-highscore');
const wrapper = document.querySelector('#wrapper');
const results = document.querySelector('#results');
const playAgainEl = document.querySelector('#playAgain');
const highscoreEl = document.querySelector('#highscore');


// stores user's answers after each round
let userAnswers = [];

// stores the right answer for each round
let correctFlag;

// stores the flags that has been on display
let usedFlags = [];

// sets the number of rounds to play depending on choice of user
let roundsToPlay;

// keeps track of number of guesses
let guesses = 0;

// keeps track of highscore
let highscore = 0;

// stores available questions
let options = [];

// get current highscore from localStorage
let currentHighscore;



// Fisher-Yates algorithm for shuffling array
const shuffleFlags = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };
};


// displays buttons for how many flags to guess on
const frontPage = () => {
    startGameEl.innerHTML = `
    <button class="rounds-btn start">10</button>
    <button class="rounds-btn start">20</button>
    <button class="rounds-btn start">50</button>`;
};


// Function for game
const playGame = () => {

    // updates currentHighscore to highscore from localStorage
    currentHighscore = localStorage.getItem("highscore")

    // empty question and answer before every run
    pictureEl.innerHTML = '';
    answersEl.innerHTML = '';

    // copy of students
    let shuffledFlags = flags;

    // shuffling array shuffledFlags
    shuffleFlags(shuffledFlags);

    // filters out all shuffledFlags that does not appear in `usedFlags` and stores this in new variable
    correctFlag = shuffledFlags.filter(flag => !usedFlags.includes(flag));

    // sets correctFlag to the first index of the returned, filtered array
    correctFlag = correctFlag[0];

    // pushes the current `correctFlag` into usedFlag to avoid displaying again
    usedFlags.push(correctFlag);

    // displays image of correct Flag
    pictureEl.innerHTML = `<img src=${correctFlag.image} id="flag-img">`

    // sets an array of incorrect Flags to display as answer options
    let wrongFlags = flags.filter(flag => !usedFlags.includes(flag));

    // picks 3 wrong flags and 1 correct
    options = wrongFlags.slice(0, 3);
    options.push(correctFlag);

    // shuffling options to be presented
    shuffleFlags(options);

    options.forEach(flag => {
        answersEl.innerHTML += `<button id="answer-btn">${flag.country}</button>`
    });

    restartEl.innerHTML = `
    <button class="restart">Restart Game</button>
    `
};

//  correct answers
const correctChoice = flag => {

    // adds a key to array that shows if user guessed right
    flag.result = 'correct ✅';

    // pushes the answer into an empty array 
    userAnswers.push(flag)
};

//  incorrect answers
const incorrectChoice = flag => {

    // adds a key to array that shows if user guessed wrong
    flag.result = 'wrong ❌';

    // pushes the answer into an empty array 
    userAnswers.push(flag);
};

// adds a click events to show number of rounds depending on what user picks
startGameEl.addEventListener('click', e => {

    // checks if the click happened on a button, and runs if so was
    if (e.target.tagName === "BUTTON") {

        // hide instructions while game is active
        instructions.classList.add('hide');

        // invoke playGame() function to initialize game
        playGame();

        // sets the number of rounds to play to the same number as the pressed button
        roundsToPlay = Number(e.target.innerText);

        // prints current highscore from localStorage if not null
        if (currentHighscore != null) {
            currentHighscoreEl.innerHTML += `
            <h3 class="question-counter">Current Highscore: ${currentHighscore}</h3>
            `;
        }

        // prints to DOM and updates question counter
        roundCounterEl.innerHTML += `
        <h3 class="question-counter">Question: ${guesses + 1}/${roundsToPlay}</h3>
        `;

    };
});


answersEl.addEventListener('click', e => {

    if (e.target.tagName === "BUTTON") {

        const buttons = document.querySelectorAll("#answer-btn")

        // once answer is made, set all buttons to disabled to prevent user from spamming
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('disabled', 'disabled')
        }

        // increments guesses by 1 for each click
        guesses++;

        // checks if answer was correct
        if (e.target.innerText === correctFlag.country) {
            correctChoice(correctFlag);
            e.target.innerHTML += '✅'
        } else {
            incorrectChoice(correctFlag);
            e.target.innerHTML += '❌'

        };

        setTimeout(() => {
            // updates the round counter for each round
            roundCounterEl.innerHTML = `
                <h3 class="question-counter">Question ${guesses + 1}/${roundsToPlay}</h3>
            `;
            // when a set number of rounds are played, exitGame() will be invoked.
            if (guesses === roundsToPlay) {
                exitGame();
            } else {
                playGame();
            };
        }, 700)
    };
});

// if user clicks restart button mid game
restartEl.addEventListener('click', e => {
    if (e.target.tagName === "BUTTON") {
        window.location.reload()
    }
});


//  game exit
const exitGame = () => {

    // hides everything except page that shows results
    wrapper.classList.add('hide');

    // filters out and store ONLY correct answers in new variable
    const correctAnswers = userAnswers.filter(answer => answer.result === 'correct ✅');

    // calculates percentage of correct answers to show in results
    let percentage = Math.round(correctAnswers.length / guesses * 100);

    if (percentage >= 80) {
        // prints results to DOM
        results.innerHTML =
            `<h2 class="result-heading">Your Result: ${correctAnswers.length}/${guesses} <span class="text-green">(${percentage}%)</span></h2>`
    } else {
        // prints results to DOM
        results.innerHTML =
            `<h2 class="result">Your Results: ${correctAnswers.length}/${guesses} <span class="text-red">(${percentage}%)</span></h2>`
    }



    // checks for new highscore and prints result to DOM
    if (correctAnswers.length > highscore) {
        highscore = correctAnswers.length;
        highscoreEl.innerText = `New Highscore: ${highscore}`;
        localStorage.setItem("highscore", highscore)
    } else {
        highscoreEl.innerText = `Current Highscore: ${highscore}`;
    };

    // prints each answered question to DOM and shows if user guesses right or wrong. Also shows correct answer
    userAnswers.forEach(answer => {
        results.innerHTML += `
        <img src=${answer.image} alt="flag to guess">
        <p class="result">☝ Your guess was ${answer.result} It's ${answer.country}</p>
        `;
    });

    // displays a button for playing again
    playAgainEl.innerHTML = `<button>Play Again</button>`

    // hides highscoreEl from being displayed
    highscoreEl.classList.remove('hide');
};


// function for playing again. Empties HTML, counters and arrays
const playAgain = () => {
    wrapper.classList.remove('hide');
    results.innerHTML = '';
    pictureEl.innerHTML = '';
    answersEl.innerHTML = '';
    playAgainEl.innerHTML = '';
    roundCounterEl.innerHTML = '';
    currentHighscoreEl.innerHTML = '';
    restartEl.innerHTML = '';
    instructions.classList.remove('hide');
    highscoreEl.classList.add('hide');
    guesses = 0;
    userAnswers = [];
    usedFlags = [];
};

// invokes playAgain function once playAgainEl is clicked
playAgainEl.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
        playAgain();
    };
});

// shows front page where user picks difficulty;
frontPage();











