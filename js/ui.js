/**
 * Manage all ui elements
 * @author Alex Etienne
 * @since 2025-02-07
 */

// Import
import { addTime } from "./firebase.js";

// Constants
const NBR_OF_LETTERS_INPUT = document.querySelector("#nbrOfLetters");

// Global variables
let openedPage = "home";

// Parameters
let nbrOfLetters = 0;
let sizeOfLetters = 0;
let time = 0;
let gameRanked = false;

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
function startGame(ranked = false) {
  // Get the difficulty and set the parameters
  if (!ranked) {
    sizeOfLetters = 11 - document.querySelector("#difficulty").value;
    nbrOfLetters = NBR_OF_LETTERS_INPUT.value;
  } else {
    sizeOfLetters = 1;
    nbrOfLetters = 30;
  }

  document.querySelector("#game").style.padding = sizeOfLetters + 2 + "em";
  gameRanked = ranked;

  time = Date.now();
  openPage("game");
}

/**
 * End the game.
 */
function endGame() {
  time = (Date.now() - time) / 1000;
  document.querySelector("#time").innerHTML = "Time : " + time + " seconds";

  if (gameRanked) {
    document.querySelector("#leaderboard").style.display = "block";
    openPage("pseudo");
  } else {
    openPage("end");
  }
}

/**
 * Fill the leaderboard of the end page.
 * @param leaderboardObj The leaderboard data in an object.
 */
function fillLeaderboard(leaderboardObj) {
  if (leaderboardObj === null) {
    return;
  }

  let leaderboard = [];
  Object.keys(leaderboardObj).forEach(function (key) {
    leaderboard.push([key, leaderboardObj[key]]);
  });

  leaderboard.sort((a, b) => {
    return a[1] - b[1]
  });

  let htmlLeaderboard = "<tr><th colSpan=\"2\">Leaderboard</th></tr><tr><th>Name</th><th>Time</th></tr>";
  for (let line of leaderboard) {
    htmlLeaderboard += `<tr><td>${line[0]}</td><td>${line[1]}</td></tr>`
  }

  document.querySelector("#leaderboard").innerHTML = htmlLeaderboard;

}

// Force the input to be positive
NBR_OF_LETTERS_INPUT.addEventListener("focusout", () => {
  if (NBR_OF_LETTERS_INPUT.value < 1) {
    NBR_OF_LETTERS_INPUT.value = 1;
  }
});

// Define the action of the play buttons
document.querySelector("#play").addEventListener("click", () => {startGame()});
document.querySelector("#playRanked").addEventListener("click", () => {startGame(true)});

// Define the action of next button of the pseudo page
document.querySelector("#nextButton").addEventListener("click", () => {
  addTime(document.querySelector("#pseudoInput").value, time);
  openPage("end");
});

// Exports
export { openedPage, nbrOfLetters, sizeOfLetters, gameRanked, endGame, fillLeaderboard };

//startGame();
