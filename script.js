const textElement = document.getElementById("text");
const unscrambleButton = document.getElementById("unscramble");
const rescrambleButton = document.getElementById("rescramble");

// Bewaar de originele tekst
const originalText = textElement.textContent;

// Scramble functie (ASCII +1)
function scrambleText(text) {
  return text
    .split("")
    .map((char) => {
      if (char.match(/[a-zA-Z]/)) {
        return String.fromCharCode(char.charCodeAt(0) + 1);
      }
      return char;
    })
    .join("");
}

// Unscramble functie met animatie
function unscrambleText() {
  const scrambledArray = textElement.textContent.split("");
  const targetArray = originalText.split("");
  let completedIndexes = new Set();

  unscrambleButton.style.display = "none";
  rescrambleButton.style.display = "none";

  const interval = setInterval(() => {
    let index;
    do {
      index = Math.floor(Math.random() * scrambledArray.length);
    } while (completedIndexes.has(index) || !scrambledArray[index].match(/./));

    const currentChar = scrambledArray[index];
    const targetChar = targetArray[index];

    if (currentChar !== targetChar) {
      scrambledArray[index] = targetChar;
      textElement.textContent = scrambledArray.join("");
    }

    completedIndexes.add(index);

    if (completedIndexes.size === scrambledArray.length) {
      clearInterval(interval);
      rescrambleButton.style.display = "inline-block";
    }
  }, 5);
}

// Rescramble met animatie
function rescrambleText() {
  const scrambledArray = textElement.textContent.split("");
  let completedIndexes = new Set();

  unscrambleButton.style.display = "none";
  rescrambleButton.style.display = "none";

  const interval = setInterval(() => {
    let index;
    do {
      index = Math.floor(Math.random() * scrambledArray.length);
    } while (completedIndexes.has(index));

    const currentChar = scrambledArray[index];

    if (currentChar.match(/[a-zA-Z]/)) {
      scrambledArray[index] = String.fromCharCode(currentChar.charCodeAt(0) + 1);
      textElement.textContent = scrambledArray.join("");
    }

    completedIndexes.add(index);

    if (completedIndexes.size === scrambledArray.length) {
      clearInterval(interval);
      unscrambleButton.style.display = "inline-block";
    }
  }, 5);
}

// Begin met gescramblde tekst
textElement.textContent = scrambleText(originalText);

// Toon juiste knop bij start
unscrambleButton.style.display = "inline-block";
rescrambleButton.style.display = "none";

// Knoppen activeren
unscrambleButton.addEventListener("click", unscrambleText);
rescrambleButton.addEventListener("click", rescrambleText);

