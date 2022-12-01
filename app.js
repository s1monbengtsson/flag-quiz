// Grabbing elements from DOM

const startGame = document.querySelector('.game-start');
const instructions = document.querySelector('.instructions');
const listEl = document.querySelector('#answer-list');
const pictureEl = document.querySelector('#image-holder');
const answersEl = document.querySelector('.answers');
const questionCounterEl = document.querySelector('#question-counter');
const roundCounterEl = document.querySelector('#rounds-to-play');
const wrapper = document.querySelector('#wrapper');
const results = document.querySelector('#results');
const userAnswersEl = document.querySelector('#userAnswers');
const keyEl = document.querySelector('#key');
const playAgainEl = document.querySelector('#playAgain');
const correctAnswersEl = document.querySelector('#correctAnswers');
const wrongAnswersEl = document.querySelector('#wrongAnswers');

// Variable that stores the user's answers
let userAnswers = [];

// Varible that stores the correct answer
let key = [];

// Variable for storing the right answer
let correctStudent;

// Array for storing only student names
let studentNames = [];

// counter for how many rounds has been played
let roundCounter = 1;

// sets the number of rounds to play depending on choice of user
let roundsToPlay;

// Variable for keeping track of guesses
let guesses = 0;


// Fisher-Yates algorithm for shuffling array
const shuffleStudents = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };
};


// Function for game
const playGame = () => {

    // Empty question and answer before every run
    pictureEl.innerHTML = '';
    answersEl.innerHTML = '';

    // Creating a copy of students 
    const shuffledStudents = students;

    // Shuffling objects in students to make game non-predictable
    shuffleStudents(shuffledStudents);

    // slicing students to pick from a randomized array of 4 objects
    const slicedStudents = shuffledStudents.slice(0, 4);
    // console.log('sliced students, before shuffling', slicedStudents);


    // variable for the right answer
    correctStudent = shuffledStudents[0];
    key.push(correctStudent);
    console.log("Keys:", key);

    // Displays image of the student to guess
    pictureEl.innerHTML = `<img src=${correctStudent.image} class="img-fluid">`

    // Removed the student that has been displayed!
    shuffledStudents.shift();


    // Shuffle the sliced array once again to make the game more randomized
    shuffleStudents(slicedStudents);
    // console.log('sliced students, but after shuffle', slicedStudents);

    // Creating new array that only contains students name
    studentNames = slicedStudents.map(student => student.name);
    // console.log('studentNames:', studentNames);

    // Print options to DOM
    studentNames.forEach(student => {
        answersEl.innerHTML += `<button class="btn btn-warning m-2 p-3 col-5">${student}</button>`
    });

    // Hide instructions while game is active
    instructions.style.display = "none";

    console.log("userAnswers:", userAnswers);

};


// Function for correct answers
const correctChoice = student => {

    // adds a key to array that shows if user guessed right
    student.correct = 'correct ✅';

    // pushes the answer into empty array 
    userAnswers.push(student)

    // Increments correctAnswers by 1 each time user gives correct answer
    guesses++;
    playGame();

};


// Function for incorrect answers
const incorrectChoice = student => {

    // adds a key to array that shows if user guessed wrong
    student.correct = 'wrong ❌';

    // pushes the answer into empty array 
    userAnswers.push(student);

    guesses++;
    playGame();
};


// add click events to show number of rounds depending on what user picks
startGame.addEventListener('click', e => {

    // Checks if the click happened on a button, and runs if so was
    if (e.target.tagName === "BUTTON") {

        // run playGame() function to start game
        playGame();

        // Sets the number of rounds to play to the same number as the pressed button
        let roundsToPlay = Number(e.target.innerText);
        console.log("rounds to play:", roundsToPlay);

        // Sets the round counter and rounds to play and prints to DOM
        questionCounterEl.innerText = `Question: ${roundCounter}/`;
        roundCounterEl.innerText = `${roundsToPlay}`;

        // Adding eventlistener to run playGame() once user has answered a question
        answersEl.addEventListener('click', e => {

            if (e.target.tagName === "BUTTON") {

                // Copying value from correctStudent to use in if statement
                let student = correctStudent;

                // Checks if answer was correct
                if (e.target.innerText === student.name) {
                    correctChoice(student);
                } else {
                    incorrectChoice(student);
                };

                // Updates the round counter for each round
                questionCounterEl.innerText = `Question: ${roundCounter + 1} /`;
                roundCounter++;
            };

            // When set number of rounds are played, exitGame() will run.
            if (guesses === roundsToPlay) {
                console.log('exiting game');
                exitGame();
            };
        });
    };
});


// Exit game

const exitGame = () => {

    // Filter out and store ONLY correct answers in new variable
    let correctAnswers = userAnswers.filter(num => num.correct === 'correct ✅');
    console.log(correctAnswers);

    wrapper.classList.add('hide');

    // calculates percentage to show in results
    let percentage = correctAnswers.length / guesses * 100;



    // Prints results to DOM
    userAnswersEl.innerHTML = `<h2 class="text-center mt-5">Your Results: ${correctAnswers.length}/${guesses} <span class="text-warning">(${percentage}%)</span></h2>`

    userAnswers.forEach(answer => {
        userAnswersEl.innerHTML += `
        <img src=${answer.image} alt="picture of student" style="height:150px" class=img-fluid">
        <p class="d-flex justify-content-center pt-1 pb-5 list-none">☝ Your guess was ${answer.correct}</p>
        `;
    });

    playAgainEl.innerHTML = `<button class="btn btn-primary py-3">Play Again</button>`

    playAgainEl.addEventListener('click', () => {
        window.location.reload();
    });
};





/**
 * Todo innan inlämning:
 * Refaktorera koden, ingen kod ska upprepas i onödan
 * Lägga in img-element i HTML, och istället pusha in en source genom playGame()
 * Gå igenom och ta bort variabler som ej används
 * Snygg display av jämförelse mellan vad användare svarat och facit
 * Säkerställa att både map() och filter() används för VG
 * Kontrollera så spelet är responsivt och funkar i mobil
 * Om tid finns, hitta ett bättre sätt för playAgain än att refresha sidan
 * göra ifs till ternary
 * Merge dev into main
 */








