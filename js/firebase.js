/**
 * Manage firebase
 * @author Alex Etienne
 * @since 2025-02-07
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";
import { fillLeaderboard } from "./ui.js";

const firebaseConfig = {
    apiKey: "AIzaSyAvNy0HjRnRSlFMt1DEVa6vtLre0lWmhu0",
    authDomain: "areflexgame.firebaseapp.com",
    databaseURL: "https://areflexgame-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "areflexgame",
    storageBucket: "areflexgame.firebasestorage.app",
    messagingSenderId: "517827927221",
    appId: "1:517827927221:web:7abfbe501317c2048d72fc"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

let actualLeaderboard = {};

// Update the local leaderboard
onValue(ref(database), (snapshot) => {
    fillLeaderboard(snapshot.val());
    actualLeaderboard = snapshot.val();
});

/**
 * Add a new time or replace a worse one.
 * @param pseudo
 * @param time
 */
function addTime(pseudo, time) {
    if (actualLeaderboard === null || !Object.hasOwn(actualLeaderboard, pseudo) ||
        (actualLeaderboard[pseudo] > time && Object.hasOwn(actualLeaderboard, pseudo))) {
        set(ref(database, pseudo), time);
    }
}

export { addTime };
