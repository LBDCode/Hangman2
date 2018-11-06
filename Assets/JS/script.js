
"use strict";


var ans = "";
var ansArr = [];
var guessArr = [];
var score = 0;
var guessesRemain = 9;
var wrongLetters = [];
var guess;
var possGuesses = "qwertyuiopasdfghjklzxcvbnm";


var game = {    
    wordBank1: ["acorn","apple","autumn","chestnuts","cider","cobweb","cold","corn",
        "fall","feast","harvest","haystack","leaves","pumpkin","pie","scarecrow","squash",
        "stuffing","turkey"],

    randNum: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; 
    },

    chooseWord: function () {
        wrongLetters = [];
        guessArr = [];
        ans = this.wordBank1[this.randNum(0, this.wordBank1.length)];
        ansArr = ans.split('');
    },
    
    updateGuessArr: function () {
        for (var i = 0; i < ansArr.length; i++){
            guessArr[i] = "_"
        }
    },

    checkGuess: function() {
        // note: 'includes' isn't fully supported. I'd either use a regex or
        // split the "guess check" portion out into a sep function w/ a for loop through the
        // ansArr here if I needed to this to work in older vesions of IE.


        if (ansArr.includes(guess)) {
            for (var i = 0; i < ansArr.length; i++) {
                if (ansArr[i] === guess) {
                    guessArr[i] = guess;
                };
            }
            if (guessArr.join("") === ans) {
                game.win();
            } 
        } else {
            if (wrongLetters.includes(guess)) {
                alert("You already tried that letter.");
            } else {
                wrongLetters.push(guess);
                --guessesRemain;
            }
        }
    },

    updateUI: function() {
        document.getElementById("guess").textContent = guessArr.join(" ");
        document.getElementById("score").textContent = "Score: " + score;
        document.getElementById("guessesRemain").textContent = "Remaining Guesses: " + guessesRemain;
        document.getElementById("wrongLetters").textContent = "Incorrect Guesses: " + wrongLetters.join(" ");
        document.getElementById("message").textContent = "";
        document.getElementById("gameImg").src = "Assets/Images/" + guessesRemain + ".png";
    },
    
   
    win: function() {
        score++;
        guessesRemain = 9;
        this.chooseWord();
        this.updateGuessArr();
        this.updateUI();
        
    },

    endGame: function() {
        alert("Sorry, the answer was: " + ans + ". Better luck next time!");
    },

    init: function() {
        ans = "";
        ansArr = [];
        guessArr = [];
        score = 0;
        guessesRemain = 9;
        wrongLetters = [];
        guess;
    },

    newGame: function() {
        game.init();
        game.chooseWord();
        game.updateGuessArr();
        game.updateUI();
    },

         
}
 
  
document.getElementById("newGame").addEventListener("click", game.newGame); 

document.onkeypress = function(event) {
    guess = event.key.toLowerCase();
    if (possGuesses.includes(guess)) {
        if (guessesRemain > 0) {
            game.checkGuess();
            game.updateUI();
        } else {
            game.endGame();
        }
    }
};






