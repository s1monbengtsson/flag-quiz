// Grabbing elements from DOM

const startGame = document.querySelector('.start-game');
const toggle = document.querySelector('.game-toggle');
const instructions = document.querySelector('.instructions');



startGame.addEventListener('click', () => {
    toggle.style.display = "block";
    instructions.style.display = "none";
});