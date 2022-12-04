// Grabbing elements from DOM

const startGameEl = document.querySelector('.game-start');
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
const intro = document.querySelector('#intro');
const btnEl = document.querySelector('.playGame');

// Variable that stores the user's answers
let userAnswers = [];

// Varible that stores the correct answer
let key = [];

// Variable for storing the right answer
let correctStudent;

// Array for storing used students
let usedStudents = [];

// counter for how many rounds has been played
let roundCounter = 1;

// sets the number of rounds to play depending on choice of user
let roundsToPlay;

// Variable for keeping track of guesses
let guesses = 0;

let moreOptions = [];


const maxRounds = students.length;
console.log("maxrounds:", maxRounds);




// Fisher-Yates algorithm for shuffling array
const shuffleStudents = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };
};

const frontPage = () => {
    startGameEl.innerHTML = `
    <button class="btn btn-success m-2 px-4 playGame">10</button>
    <button class="btn btn-warning m-2 px-4 playGame">20</button>
    <button class="btn btn-danger m-2 px-4 playGame">${students.length}</button>`
}


// Function for game
const playGame = () => {

    // Empty question and answer before every run
    pictureEl.innerHTML = '';
    answersEl.innerHTML = '';


    // Creating a copy of students 
    const shuffledStudents = students

    // Shuffling objects in students to make game non-predictable
    shuffleStudents(shuffledStudents);

    // Mapping out only the name to then output to DOM
    const studentNames = shuffledStudents.map(student => student.name);

    // slicing students to pick from a randomized array of 4 objects
    let slicedStudents = studentNames.slice(0, 4);

    // variable for the right answer
    correctStudent = shuffledStudents.find(student => !usedStudents.includes(student));
    key.push(correctStudent);
    usedStudents.push(correctStudent);

    console.log("used students:", usedStudents);

    console.log("shuffled students:", shuffledStudents);

    // Displays image of the student to guess
    pictureEl.innerHTML = `<img src=${correctStudent.image} class="img-fluid">`

    // // Removed the student that has been displayed!
    // shuffledStudents.shift();
    // console.log("Students org:", students);
    // console.log("shuffled students:", shuffledStudents);

    // Shuffle the sliced array once again to make the game more randomized
    shuffleStudents(slicedStudents);
    // console.log('sliced students, but after shuffle', slicedStudents);

    // Creating new array to use when shuffledStudents can't provide alternatives
    moreOptions.push(correctStudent.name);


    // Shuffle array and then slice moreOptions to only print 4 at a time
    shuffleStudents(moreOptions);
    const slicedMoreOptions = moreOptions.slice(0, 4);

    // Print options to DOM
    (studentNames.length > 4)
        ? slicedStudents.forEach(name => {
            answersEl.innerHTML += `<button class="btn btn-warning m-2 p-3 col-5 playGame">${name}</button>`
        })
        : slicedMoreOptions.forEach(name => {
            answersEl.innerHTML += `<button class="btn btn-warning m-2 p-3 col-5 playGame">${name}</button>`
        })

    // Hide instructions while game is active
    instructions.classList.add('hide');


};



// Function for correct answers
const correctChoice = student => {

    // adds a key to array that shows if user guessed right
    student.result = 'correct ✅';

    // pushes the answer into empty array 
    userAnswers.push(student)
    console.log("userAnswers:", userAnswers)


};


// Function for incorrect answers
const incorrectChoice = student => {

    // adds a key to array that shows if user guessed wrong
    student.result = 'wrong ❌';

    // pushes the answer into empty array 
    userAnswers.push(student);
    console.log("userAnswers:", userAnswers)

};


// add click events to show number of rounds depending on what user picks
startGameEl.addEventListener('click', e => {

    // Checks if the click happened on a button, and runs if so was
    if (e.target.tagName === "BUTTON") {

        // run playGame() function to initialize game
        playGame();

        // Sets the number of rounds to play to the same number as the pressed button
        let roundsToPlay = Number(e.target.innerText);
        console.log("rounds to play:", roundsToPlay);

        // Sets the round counter and rounds to play and prints to DOM
        questionCounterEl.innerText = `Question: ${roundCounter}/`;
        roundCounterEl.innerText = `${roundsToPlay}`;


        answersEl.addEventListener('click', e => {

            // increments guesses by 1 for each click
            guesses++;
            console.log("guesses", guesses);

            // Copying value from correctStudent to use in if statement
            let student = correctStudent;

            // Checks if answer was correct
            if (e.target.innerText === student.name) {
                correctChoice(student);
            } else {
                incorrectChoice(student);
            };


            // increments roundCounter by 1
            roundCounter++;

            // Updates the round counter for each round
            questionCounterEl.innerText = `Question: ${roundCounter} /`;

            // When set number of rounds are played, exitGame() will run.
            if (guesses === roundsToPlay) {
                console.log('exiting game');
                exitGame();
            } else {
                playGame();
            }
        });
    };

});





// Exit game

const exitGame = () => {



    // Filter out and store ONLY correct answers in new variable
    const correctAnswers = userAnswers.filter(answer => answer.result === 'correct ✅');
    console.log(correctAnswers);

    wrapper.classList.add('hide');

    // calculates percentage of right answers to show in results
    let percentage = Math.round(correctAnswers.length / guesses * 100);

    // Prints results to DOM
    userAnswersEl.innerHTML = `<h2 class="text-center mt-5">Your Results: ${correctAnswers.length}/${guesses} <span class="text-warning">(${percentage}%)</span></h2>`

    userAnswers.forEach(answer => {
        userAnswersEl.innerHTML += `
        <img src=${answer.image} alt="picture of student" style="height:150px" class=img-fluid">
        <p class="d-flex justify-content-center pt-1 pb-4 list-none">☝ Your guess was ${answer.result} It's ${answer.name}</p>
        `;
    });

    // Displays a button for playing again
    playAgainEl.innerHTML = `<button class="btn btn-primary py-3 mb-5">Play Again</button>`


};

const playAgain = () => {
    wrapper.classList.remove('hide');
    results.innerHTML = '';
    pictureEl.innerHTML = '';
    answersEl.innerHTML = '';
    playAgainEl.innerHTML = '';
    roundCounterEl.innerHTML = '';
    questionCounterEl.innerHTML = '';
    instructions.classList.remove('hide');
    roundCounter = 1;
    guesses = 0;
    key = [];
    userAnswers = [];
    moreOptions = [];
    usedStudents = [];

};

playAgainEl.addEventListener('click', () => {
    playAgain();
});

// Showing front page where user picks difficulty;
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








