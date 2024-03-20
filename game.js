const MAX_NUMBERS = {
    קל: 5,
    בינוני: 7,
    קשה: 9,
  };
  
  const MAX_GUESSES = {
    קל: 18,
    בינוני: 14,
    קשה: 10,
  };
  
  // פונקציה שיוצרת מספר סודי אקראי
  function generateSecretCode(maxNumber, length) {
    const code = [];
    for (let i = 0; i < length; i++) {
      code.push(Math.floor(Math.random() * maxNumber) + 1);
    }
    return code;
  }
  
  // פונקציה שבודקת ניחוש ומחזירה את מספר הפגיעות והפסאודו-פגיעות
  function checkGuess(guess, secretCode) {
    let hits = 0;
    let pseudoHits = 0;
  
    const guessMap = new Map();
    for (let i = 0; i < guess.length; i++) {
      guessMap.set(guess[i], (guessMap.get(guess[i]) || 0) + 1);
    }
  
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === secretCode[i]) {
        hits++;
      } else if (guessMap.has(secretCode[i]) && guessMap.get(secretCode[i]) > 0) {
        pseudoHits++;
        guessMap.set(secretCode[i], guessMap.get(secretCode[i]) - 1);
      }
    }
  
    return { hits, pseudoHits };
  }
  
  // פונקציה שמפעילה את המשחק
  function playGame(difficulty) {
    const maxNumber = MAX_NUMBERS[difficulty];
    const maxGuesses = MAX_GUESSES[difficulty];
    const secretCode = generateSecretCode(maxNumber, 4);
  
    let guesses = 0;
    let success = false;
  
    while (guesses < maxGuesses && !success) {
      let guess;
  
      // קבלת ניחוש מהמשתמש
      do {
        guess = prompt(
          `הזן ניחוש (4 מספרים בין 1 ל-${maxNumber}): `
        ).split(" ").map(Number);
      } while (!guess || guess.length !== 4 || guess.some((num) => num < 1 || num > maxNumber));
  
      const { hits, pseudoHits } = checkGuess(guess, secretCode);
      guesses++;
  
      // הצגת תוצאות הניחוש
      alert(`ניחוש ${guesses}: ${hits} בול פגיעה, ${pseudoHits} פגיעה`);
  
      if (hits === 4) {
        success = true;
      }
    }
  
    // הצגת הודעה סופית
    if (success) {
      alert(`ניצחת! ניחשת את הקוד הסודי ב-${guesses} ניחושים.`);
    } else {
      alert(`הפסדת! הקוד הסודי היה: ${secretCode.join(", ")}.`);
    }
  
    // שאילת המשתמש אם רוצה לשחק שוב
    const playAgain = confirm("האם רוצה לשחק שוב?");
    if (playAgain) {
      playGame(difficulty);
    } else {
      alert(`ביצעת ${guesses} ניחושים במשחק זה.`);
    }
  }
  
  // התחלת המשחק
  let difficulty;
  
  do {
    difficulty = prompt("בחר רמת קושי: (קל,בינוני,קשה)");
  } while (!["קל", "בינוני", "קשה"].includes(difficulty));
  
  playGame(difficulty);
  