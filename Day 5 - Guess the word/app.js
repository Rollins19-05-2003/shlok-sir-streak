// Array of random 5-letter words
const wordList = ["APPLE", "MANGO", "GRAPE", "LEMON", "PLUMS", "PEACH", "BERRY", "LIMES", "MELON"];

// Function to pick a random word from the list
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

// Variables
let word = getRandomWord();  // Generate a random 5-letter word
const wordDisplay = document.getElementById("word-display");
const letterInput = document.getElementById("letter-input");
const guessBtn = document.getElementById("guess-btn");
const guessedLettersElem = document.getElementById("guessed-letters");
const remainingGuessesElem = document.getElementById("remaining-guesses");
const gameMessage = document.getElementById("game-message");

let guessedLetters = [];
let remainingGuesses = 10;

// Display initial word state (only show 2 random letters)
let revealedWord = Array.from(word);
let randomIndices = getRandomIndices(2, word.length);
revealedWord = revealedWord.map((letter, index) => randomIndices.includes(index) ? letter : '•');
wordDisplay.innerText = revealedWord.join(' ');

// Event Listeners
guessBtn.addEventListener('click', () => {
    const guess = letterInput.value.toUpperCase();
    letterInput.value = ''; // Clear the input after each guess

    // Validate guess
    if (guess.length === 1 && /^[A-Z]$/.test(guess)) {
        processGuess(guess);
    }
});

// Function to handle guesses
function processGuess(guess) {
    // if (guessedLetters.includes(guess)) {
    //     gameMessage.textContent = `You already guessed the letter ${guess}`;
    //     return;
    // }

    guessedLetters.push(guess);

    if (word.includes(guess)) {
        gameMessage.textContent = `Good guess! The word has the letter ${guess}.`;
        revealLetter(guess);
    } else {
        gameMessage.textContent = `Sorry, the word doesn't contain the letter ${guess}.`;
        remainingGuesses--;
    }

    updateDisplay();
    checkGameOver();
}

// Reveal guessed letter
// Reveal guessed letter
function revealLetter(letter) {
    let letterFound = false;

    revealedWord = revealedWord.map((char, index) => {
        if (word[index] === letter && !letterFound && revealedWord[index] === "•") {
            letterFound = true;
            return letter; // Replace '•' with the actual letter
        } else {
            return char; // Keep the current character ('•' or already revealed letter)
        }
    });
}


// Update display
function updateDisplay() {
    wordDisplay.innerText = revealedWord.join(' ');
    guessedLettersElem.textContent = guessedLetters.join(' ');
    remainingGuessesElem.textContent = `You have ${remainingGuesses} guesses remaining.`;
}

// Check if game is over
function checkGameOver() {
    if (!revealedWord.includes('•')) {
        gameMessage.textContent = "Congratulations! You've guessed the word!";
        guessBtn.disabled = true;
        let input = prompt("Congratulations🥳! You've guessed the word!\nDo you want to play again? (yes/no)");
        if(input && input.toUpperCase() === "YES"){
            resetGame();
        }
    } else if (remainingGuesses === 0) {
        gameMessage.textContent = `Game over! The word was ${word}.`;
        guessBtn.disabled = true;
    }
}

// Helper function to get random indices
function getRandomIndices(count, max) {
    const indices = [];
    while (indices.length < count) {
        const randIndex = Math.floor(Math.random() * max);
        if (!indices.includes(randIndex)) {
            indices.push(randIndex);
        }
    }
    return indices;
}

// Reset the game (optional)
function resetGame() {
    word = getRandomWord();  // Get a new random word
    guessedLetters = [];
    remainingGuesses = 10;
    randomIndices = getRandomIndices(2, word.length);
    revealedWord = Array.from(word).map((letter, index) => randomIndices.includes(index) ? letter : '•');
    
    updateDisplay();
    gameMessage.textContent = "The word has 5 letters.";
    guessBtn.disabled = false;
}
