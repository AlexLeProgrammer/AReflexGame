/**
 * Game code
 * @author Alex Etienne
 * @since 2025-02-07
 */

// Imports
import { endGame, nbrOfLetters, openedPage, sizeOfLetters } from "./ui.js";

//#region Constants

// Delta-time
const DEFAULT_FPS = 60;

// Inputs
const INPUTS_LIST = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

// Get the pages elements
const PAGE = document.querySelector("#game");

//#endregion

//#region Global variables

// Delta-time
let deltaTime = 0;
let lastTick = 0;

// Game
let lettersRemaining = -1;

// Inputs
let actualInput = '';

//#endregion

// Main loop
setInterval(() => {
    // Skip if not in game
    if (openedPage !== "game") {
        return;
    } else if (lettersRemaining < 0) {
        lettersRemaining = nbrOfLetters;
    }

    // Delta-time
    deltaTime = (performance.now() - lastTick) / (1000 / DEFAULT_FPS);
    lastTick = performance.now();

    //region Display

    // Clear the canvas
    //CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    if (PAGE.childElementCount === 0 && lettersRemaining > 0) {
        let letter = PAGE.appendChild(document.createElement("letter"));
        letter.innerHTML = INPUTS_LIST[Math.floor(Math.random() * INPUTS_LIST.length)];
        letter.style.left = Math.random() * 100 + "%";
        letter.style.top = Math.random() * 100 + "%";
        letter.style.fontSize = sizeOfLetters + "em";
    } else {
        if (actualInput === PAGE.lastElementChild.innerHTML) {
            PAGE.innerHTML = "";
            lettersRemaining--;
        }
    }

    // Finish the game
    if (lettersRemaining === 0) {
        endGame();
    }

    //#endregion

    // Reset the input
    actualInput = '';

});

//#region Inputs

// Detect if a key is pressed
document.addEventListener("keydown", (e) => {
    for (let char of INPUTS_LIST) {
        if (e.key === char) {
            actualInput = char;
        }
    }
});

//#endregion
