/**
 * Manage all ui elements
 * @author AlexEtienne
 * @since 2025-02-07
 */

// Constants
const NBR_OF_LETTERS_INPUT = document.querySelector("#nbrOfLetters");

// Global variables
let openedPage = "home";

// Parameters
let nbrOfLetters = 0;
let sizeOfLetters = 0;
let time = 0;

/**
 * Open a page by its id and closes all others
 * @param id the page to open
 */
function openPage(id) {
  for (let page of document.querySelectorAll(".page")) {
    page.style.display = "none";
  }

  document.getElementById(id).style.display = id === "game" ? "block" : "flex";
  openedPage = id;
}

/**
 * Start the game.
 */
function startGame() {
  // Get the difficulty and set the parameters
  sizeOfLetters = 11 - document.querySelector("#difficulty").value;
  nbrOfLetters = NBR_OF_LETTERS_INPUT.value;

  document.querySelector("#game").style.padding = sizeOfLetters + 2 + "em";

  time = Date.now();

  openPage("game");
}

function endGame() {
  document.querySelector("#time").innerHTML = "Time : " + (Date.now() - time) / 1000 + " seconds";
  openPage("end");
}

// Force the input to be positive
NBR_OF_LETTERS_INPUT.addEventListener("focusout", () => {
  if (NBR_OF_LETTERS_INPUT.value < 1) {
    NBR_OF_LETTERS_INPUT.value = 1;
  }
});

//startGame();
