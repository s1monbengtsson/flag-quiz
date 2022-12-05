// Grabbing elements from DOM
const startGameEl = document.querySelector('#game-start');
const instructions = document.querySelector('#instructions');
const pictureEl = document.querySelector('#image-holder');
const answersEl = document.querySelector('#answers');
const roundCounterEl = document.querySelector('#roundCounter');
const wrapper = document.querySelector('#wrapper');
const results = document.querySelector('#results');
const playAgainEl = document.querySelector('#playAgain');
const highscoreEl = document.querySelector('#highscore');


// stores user's answers after each round
let userAnswers = [];

// stores the right answer for each round
let correctStudent;

// stores the students that has been on display
let usedStudents = [];

// sets the number of rounds to play depending on choice of user
let roundsToPlay;

// keeps track of number of guesses
let guesses = 0;

// keeps track of highscore
let highscore = 0;

// stores available questions
let options = [];

// stores available questions and will be used when `options` can't provide
let moreOptions = [];



// Fisher-Yates algorithm for shuffling array
const shuffleStudents = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };
};


// displays buttons for how many students to guess on
const frontPage = () => {
    startGameEl.innerHTML = `
    <button class="btn btn-success m-2 px-4 playGame">10</button>
    <button class="btn btn-warning m-2 px-4 playGame">20</button>
    <button class="btn btn-danger m-2 px-4 playGame">${students.length}</button>`;
};


// Function for game
const playGame = () => {

    // empty question and answer before every run
    pictureEl.innerHTML = '';
    answersEl.innerHTML = '';

    // copy of students
    let shuffledStudents = students;

    // shuffling array shuffledStudents
    shuffleStudents(shuffledStudents);


    // filters out all shuffledStudents that does not appear in `usedStudent` and stores this in new variable
    correctStudent = shuffledStudents.filter(student => !usedStudents.includes(student));

    // sets correctStudent to the first index of the returned, filtered array
    correctStudent = correctStudent[0];

    // pushes the current `correctStudent` into usedStudent to avoid displaying again
    usedStudents.push(correctStudent);

    // pushes correctStudent to back-up options
    moreOptions.push(correctStudent);

    // displays image of correct student
    pictureEl.innerHTML = `<img src=${correctStudent.image} class="img-fluid">`

    // sets an array of incorrect students to display as answer options
    let wrongStudents = students.filter(student => !usedStudents.includes(student));


    // picks 3 wrong students and 1 correct
    options = wrongStudents.slice(0, 3);
    options.push(correctStudent);

    // sets array that can provide more options once needed
    let moreOptionsSlice = moreOptions.slice(0, 3);
    moreOptionsSlice.push(correctStudent);

    // shuffling options to be presented
    shuffleStudents(options);
    shuffleStudents(moreOptions);


    // chooses which array to choose options from
    (options.length < 4)
        ? moreOptionsSlice.forEach(student => {
            answersEl.innerHTML += `<button class="btn btn-warning m-2 p-3 col-5 playGame">${student.name}</button>`
        })
        : options.forEach(student => {
            answersEl.innerHTML += `<button class="btn btn-warning m-2 p-3 col-5 playGame">${student.name}</button>`
        });

};








// studentNames.forEach(student => {
//     answersEl.innerHTML += `<button class="btn btn-warning m-2 p-3 col-5 playGame">${student}</button>`
// })




// function for correct answers
const correctChoice = student => {

    // adds a key to array that shows if user guessed right
    student.result = 'correct ✅';

    // pushes the answer into an empty array 
    userAnswers.push(student)
};


// Function for incorrect answers
const incorrectChoice = student => {

    // adds a key to array that shows if user guessed wrong
    student.result = 'wrong ❌';

    // pushes the answer into an empty array 
    userAnswers.push(student);
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

        // prints to DOM and updates question counter
        roundCounterEl.innerHTML = `
        <h3>Question ${guesses + 1}/${roundsToPlay}</h3>
        `;
    };
});


answersEl.addEventListener('click', e => {

    if (e.target.tagName === "BUTTON") {

        // increments guesses by 1 for each click
        guesses++;

        // Checks if answer was correct
        if (e.target.innerText === correctStudent.name) {
            correctChoice(correctStudent);
        } else {
            incorrectChoice(correctStudent);
        };

        // updates the round counter for each round
        roundCounterEl.innerHTML = `
        <h3>Question ${guesses + 1}/${roundsToPlay}</h3>
        `;

        // when a set number of rounds are played, exitGame() will be invoked.
        if (guesses === roundsToPlay) {
            exitGame();
        } else {
            playGame();
        };
    };
});


// function for game exit
const exitGame = () => {

    // hides everything except page that shows results
    wrapper.classList.add('hide');

    // filters out and store ONLY correct answers in new variable
    const correctAnswers = userAnswers.filter(answer => answer.result === 'correct ✅');

    // calculates percentage of correct answers to show in results
    let percentage = Math.round(correctAnswers.length / guesses * 100);

    // prints results to DOM
    results.innerHTML =
        `<h2 class="text-center mt-5">Your Results: ${correctAnswers.length}/${guesses} <span class="text-warning">(${percentage}%)</span></h2>`

    // checks for new highscore and prints result to DOM
    if (correctAnswers.length > highscore) {
        highscore = correctAnswers.length;
        highscoreEl.innerText = `New Highscore: ${highscore}`;
    } else {
        highscoreEl.innerText = `Current Highscore: ${highscore}`;
    };

    // prints each answered question to DOM and shows if user guesses right or wrong. Also shows correct answer
    userAnswers.forEach(answer => {
        results.innerHTML += `
        <img src=${answer.image} alt="picture of student" style="height:150px" class=img-fluid">
        <p class="d-flex justify-content-center pt-1 pb-4 list-none">☝ Your guess was ${answer.result} It's ${answer.name}</p>
        `;
    });

    // displays a button for playing again
    playAgainEl.innerHTML = `<button class="btn btn-primary py-3 mb-5">Play Again</button>`

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
    instructions.classList.remove('hide');
    highscoreEl.classList.add('hide');
    guesses = 0;
    userAnswers = [];
    usedStudents = [];
};

// invokes playAgain function once playAgainEl is clicked
playAgainEl.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
        playAgain();
    };
});

// shows front page where user picks difficulty;
frontPage();





/**
 * Todo innan inlämning:
 * Refaktorera koden, ingen kod ska upprepas i onödan
 * Lägga in img-element i HTML, och istället pusha in en source genom playGame()
 * Gå igenom och ta bort variabler som ej används

 * Kontrollera så spelet är responsivt och funkar i mobil
 * Om tid finns, hitta ett bättre sätt för playAgain än att refresha sidan
 * göra ifs till ternary
 * Merge dev into main
 */

// ## För att lösa problemet med att pusha fler alternativ testa skapa en kopia av shuffledStudents fast med map(student.name)








