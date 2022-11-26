// Grabbing elements from DOM

const startGame = document.querySelector('.start-game');
const toggle = document.querySelector('.game-toggle');
const instructions = document.querySelector('.instructions');
const listEl = document.querySelector('#answer-list');
const pictureEl = document.querySelector('#image-holder');
const answersEl = document.querySelector('.answers');
const questionCounterEl = document.querySelector('#question-counter');
const tenRounds = document.querySelector('#ten-rounds');
const twentyRounds = document.querySelector('#twenty-rounds');
const allRounds = document.querySelector('#all-rounds');

// creating array to store users answers
const userAnswers = [];

let roundCounter = 1;


// add click events to show number of rounds depending on what user picks
tenRounds.addEventListener('click', () => {
    questionCounterEl.innerText = 'Question: 1/10';
});

twentyRounds.addEventListener('click', () => {
    questionCounterEl.innerText = 'Question: 1/20';
});

allRounds.addEventListener('click', () => {
    questionCounterEl.innerText = 'Question: 1/45';
});


// Function that prints HTML when game is active
const playGame = (() => {
    // Empty question and answer before every run
    pictureEl.innerHTML = '';
    listEl.innerHTML = '';

    // Shuffling objects in students to make game non-predictable
    const shuffledStudents = students;

    shuffledStudents.sort((a, b) => {
        return Math.random() - 0.5;
    });

    // slicing students to pick from a randomized array of 4 objects
    const slicedStudents = shuffledStudents.slice(0, 4);
    console.log(slicedStudents);

    // Map pictured from sliced array
    const getPictures = slicedStudents.map(student => student.image);
    console.log(slicedStudents[0]);

    // Shuffle ONLY pictures so picture and correct answer is not the same index
    const randomizePictures = getPictures.sort((a, b) => {
        return Math.random() - 0.5;
    });


    instructions.style.display = "none";
    pictureEl.innerHTML = `<img src=${randomizePictures[0]}>`
    listEl.innerHTML += `<button class="answer-item row col-5 m-2 px-5 d-flex justify-content-center align-items-center btn btn-primary">${slicedStudents[0].name} </button>`
    listEl.innerHTML += `<button class="answer-item row col-5 m-2 px-5 d-flex justify-content-center align-items-center btn btn-primary">${slicedStudents[1].name}</button>`
    listEl.innerHTML += `<button class="answer-item row col-5 m-2 px-5 d-flex justify-content-center align-items-center btn btn-primary">${slicedStudents[2].name}</button>`
    listEl.innerHTML += `<button class="answer-item row col-5 m-2 px-5 d-flex justify-content-center align-items-center btn btn-primary">${slicedStudents[3].name}</button>`
});

// Click event for starting the game
startGame.addEventListener('click', () => {
    playGame();
});

answersEl.addEventListener('click', (e) => {
    playGame();

    questionCounterEl.innerText = `Question: ${roundCounter + 1}/10(hardcode)`;
    roundCounter++;

    // pushed the guess to an array
    userAnswers.push(e.target.textContent);
});








