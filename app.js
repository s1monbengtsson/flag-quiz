// Grabbing elements from DOM

const startGame = document.querySelector('.game-start');
const instructions = document.querySelector('.instructions');
const listEl = document.querySelector('#answer-list');
const pictureEl = document.querySelector('#image-holder');
const answersEl = document.querySelector('.answers');
const questionCounterEl = document.querySelector('#question-counter');
const roundCounterEl = document.querySelector('#rounds-to-play');
const container = document.querySelector('.container');
const showResults = document.querySelector('#results');

// Variable that stores the user's answers
let userAnswers = [];

// Varible that stores the correct answer
let key = [];

// Array for storing only student names
let studentNames = [];

// counter for how many rounds has been played
let roundCounter = 1;

// sets the number of rounds to play depending on choice of user
let roundsToPlay;


// Fisher-Yates algorithm for shuffling array
const shuffleStudents = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };
};

// add click events to show number of rounds depending on what user picks
startGame.addEventListener('click', (e) => {
    let roundsToPlay = Number(e.target.innerText);
    console.log(roundsToPlay);
    playGame();
    questionCounterEl.innerText = `Question: ${roundCounter}/`;
    roundCounterEl.innerText = `${roundsToPlay}`;

    answersEl.addEventListener('click', (e) => {
        playGame();

        questionCounterEl.innerText = `Question: ${roundCounter + 1} /`;
        roundCounter++;

        // pushed the guess to an array
        userAnswers.push(e.target.textContent);

        if (roundCounter > roundsToPlay) {
            console.log('exiting game');
            exitGame();
        }
    });

});



// twentyRounds.addEventListener('click', () => {
//     let roundsToPlay = 20;
//     playGame();
//     questionCounterEl.innerText = `Question: ${roundCounter}/`;
//     roundCounterEl.innerText = `${roundsToPlay}`;
// });

// maxRounds.addEventListener('click', () => {
//     let roundsToPlay = 41;
//     playGame();
//     questionCounterEl.innerText = `Question: ${roundCounter}/`;
//     roundCounterEl.innerText = `${roundsToPlay}`;
// });


// Function that prints HTML when game is active
const playGame = () => {
    // Empty question and answer before every run
    pictureEl.innerHTML = '';
    answersEl.innerHTML = '';

    const shuffledStudents = students;

    // Shuffling objects in students to make game non-predictable
    shuffleStudents(shuffledStudents);

    // slicing students to pick from a randomized array of 4 objects
    const slicedStudents = shuffledStudents.slice(0, 4);
    // console.log('sliced students, before shuffling', slicedStudents);

    // variable for the right answer, and sets the image on display
    let correctStudent = shuffledStudents[0];

    key.push(correctStudent);

    pictureEl.innerHTML = `<img src=${correctStudent.image}>`
    shuffledStudents.shift();
    console.log('removed:', shuffledStudents.shift());

    // console.log('correct student:', correctStudent);

    // Shuffle the sliced array once again to make the game more randomized
    shuffleStudents(slicedStudents);
    // console.log('sliced students, but after shuffle', slicedStudents);

    // Creating new array that only contains students name
    studentNames = slicedStudents.map(student => student.name);
    console.log('studentNames:', studentNames);

    // Print options to DOM
    studentNames.forEach(student => {
        answersEl.innerHTML += `<button class="btn btn-warning m-2 p-3 col-5">${student}</button>`
    });

    // Hide instructions while game is active
    instructions.style.display = "none";

    // Once students X has been displayed on picture, remove student X from array


};

// Click event for starting the game





// Exit game

const exitGame = () => {
    container.style.display = "none";
    showResults.innerHTML += `<p>${userAnswers}</p>`;
    showResults.innerHTML += `<p>Correct answers will go here:</p>`;
};








