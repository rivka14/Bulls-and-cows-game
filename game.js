const MAX_NUMBERS = { easy: 5, medium: 7, hard: 9 };
const MAX_GUESSES = { easy: 18, medium: 14, hard: 10 };

function generateSecretCode(maxNumber, length) {
  const code = [];
  for (let i = 0; i < length; i++) {
    code.push(Math.floor(Math.random() * maxNumber) + 1);
  }
  return code;
}

function checkGuess(guess, secretCode) {
  let hits = 0;
  let pseudoHits = 0;
  
  const secretMap = new Map();
  const usedPositions = new Set();
  
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === secretCode[i]) {
      hits++;
      usedPositions.add(i);
    } else {
      secretMap.set(secretCode[i], (secretMap.get(secretCode[i]) || 0) + 1);
    }
  }
  
  for (let i = 0; i < guess.length; i++) {
    if (!usedPositions.has(i) && secretMap.get(guess[i]) > 0) {
      pseudoHits++;
      secretMap.set(guess[i], secretMap.get(guess[i]) - 1);
    }
  }
  
  return { hits, pseudoHits };
}

function validateGuess(guess, maxNumber) {
  return guess && 
         guess.length === 4 && 
         guess.every(num => Number.isInteger(num) && num >= 1 && num <= maxNumber);
}

function parseGuess(input) {
  try {
    const numbers = input.trim().split(/\s+/).map(Number);
    return numbers.every(n => !isNaN(n)) ? numbers : null;
  } catch {
    return null;
  }
}

function playGame(difficulty) {
  const maxNumber = MAX_NUMBERS[difficulty];
  const maxGuesses = MAX_GUESSES[difficulty];
  const secretCode = generateSecretCode(maxNumber, 4);
  
  let guesses = 0;
  let success = false;
  
  while (guesses < maxGuesses && !success) {
    let guess;
    
    do {
      const input = prompt(`Enter guess (4 numbers between 1-${maxNumber}):`);
      if (input === null) return;
      
      guess = parseGuess(input);
    } while (!validateGuess(guess, maxNumber));
    
    const { hits, pseudoHits } = checkGuess(guess, secretCode);
    guesses++;
    
    alert(`Guess ${guesses}: ${hits} bulls, ${pseudoHits} cows`);
    
    if (hits === 4) {
      success = true;
    }
  }
  
  if (success) {
    alert(`You won! Guessed the code in ${guesses} attempts.`);
  } else {
    alert(`Game over! The secret code was: ${secretCode.join(", ")}`);
  }
  
  const playAgain = confirm("Play again?");
  if (playAgain) {
    startGame();
  }
}

function startGame() {
  let difficulty;
  
  do {
    difficulty = prompt("Choose difficulty: (easy, medium, hard)");
    if (difficulty === null) return;
  } while (!["easy", "medium", "hard"].includes(difficulty));
  
  playGame(difficulty);
}

startGame();
