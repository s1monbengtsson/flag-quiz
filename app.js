// Grabbing elements from DOM

const startGame = document.querySelector('.start-game');
const toggle = document.querySelector('.game-toggle');
const instructions = document.querySelector('.instructions');
const listEl = document.querySelector('#answer-list');
const pictureEl = document.querySelector('#image-holder');
const answersEl = document.querySelector('.answers');
const questionCounterEl = document.querySelector('#question-counter');
const roundCounterEl = document.querySelector('#rounds-to-play');
const tenRounds = document.querySelector('#ten-rounds');
const twentyRounds = document.querySelector('#twenty-rounds');
const maxRounds = document.querySelector('#all-rounds');

// creating array to store users answers
const userAnswers = [];

// counter for how many rounds has been played
let roundCounter = 1;

// sets the number of rounds to play depending on choice of user
let roundsToPlay;


// add click events to show number of rounds depending on what user picks
tenRounds.addEventListener('click', () => {
    let roundsToPlay = 10;
    playGame();
    questionCounterEl.innerText = `Question: ${roundCounter}/`;
    roundCounterEl.innerText = `${roundsToPlay}`;


});

twentyRounds.addEventListener('click', () => {
    let roundsToPlay = 20;
    playGame();
    questionCounterEl.innerText = `Question: ${roundCounter}/`;
    roundCounterEl.innerText = `${roundsToPlay}`;
});

maxRounds.addEventListener('click', () => {
    let roundsToPlay = 45;
    playGame();
    questionCounterEl.innerText = `Question: ${roundCounter}/`;
    roundCounterEl.innerText = `${roundsToPlay}`;
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
    const randomPicture = getPictures.sort((a, b) => {
        return Math.random() - 0.5;
    });


    instructions.style.display = "none";
    pictureEl.innerHTML = `<img src=${randomPicture[0]}>`
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

    questionCounterEl.innerText = `Question: ${roundCounter + 1}/`;
    roundCounter++;

    // pushed the guess to an array
    userAnswers.push(e.target.textContent);
});








