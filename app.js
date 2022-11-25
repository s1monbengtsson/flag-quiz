// Grabbing elements from DOM

const startGame = document.querySelector('.start-game');
const toggle = document.querySelector('.game-toggle');
const instructions = document.querySelector('.instructions');
const listEl = document.querySelector('#answer-list');
const pictureEl = document.querySelector('#question');
const questionCounterEl = document.querySelector('#question-counter');
const tenRounds = document.querySelector('#ten-rounds');
const twentyRounds = document.querySelector('#twenty-rounds');
const allRounds = document.querySelector('#all-rounds');


// Create an array with id's of students

const getStudentId = students.map(student => student.id);
console.log(getStudentId);

const randomStudentID = getStudentId.sort((a, b) => {
    return Math.random() - 0.5;
});






// add click events to show number of rounds depending on what user picks
tenRounds.addEventListener('click', () => {
    questionCounterEl.innerText = 'Question: -/10';
});

twentyRounds.addEventListener('click', () => {
    questionCounterEl.innerText = 'Question: -/20';
});

allRounds.addEventListener('click', () => {
    questionCounterEl.innerText = 'Question: -/45';
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

    instructions.style.display = "none";
    pictureEl.innerHTML = `<img src=${students[1].image}>`
    listEl.innerHTML += `<li class="answer-item row col-5 m-2 p-4 d-flex justify-content-center">${shuffledStudents[1].name} </li>`
    listEl.innerHTML += `<li class="answer-item row col-5 m-2 p-4 d-flex justify-content-center">${shuffledStudents[2].name}</li>`
    listEl.innerHTML += `<li class="answer-item row col-5 m-2 p-4 d-flex justify-content-center">${shuffledStudents[3].name}</li>`
    listEl.innerHTML += `<li class="answer-item row col-5 m-2 p-4 d-flex justify-content-center">${shuffledStudents[4].name}</li>`
});

// Click event for starting the game
startGame.addEventListener('click', () => {
    playGame();
});








