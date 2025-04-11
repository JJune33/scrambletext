document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.getElementById("text");
  const unscrambleButton = document.getElementById("unscramble");
  const rescrambleButton = document.getElementById("rescramble");

  console.log("Knoppen geladen:", unscrambleButton, rescrambleButton);

  const originalText = textElement.textContent;

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

  function unscrambleText() {
    const scrambledArray = textElement.textContent.split("");
    const targetArray = originalText.split("");
    let completedIndexes = new Set();

    unscrambleButton.style.display = "none";
    rescrambleButton.style.display = "none";

    const interval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        let index;
        do {
          index = Math.floor(Math.random() * scrambledArray.length);
        } while (
          completedIndexes.has(index) ||
          !scrambledArray[index].match(/./)
        );

        scrambledArray[index] = targetArray[index];
        completedIndexes.add(index);
      }

      textElement.textContent = scrambledArray.join("");

      if (completedIndexes.size === scrambledArray.length) {
        clearInterval(interval);
        rescrambleButton.style.display = "inline-block";
      }
    }, 5);
  }

  function rescrambleText() {
    const scrambledArray = textElement.textContent.split("");
    let completedIndexes = new Set();

    unscrambleButton.style.display = "none";
    rescrambleButton.style.display = "none";

    const interval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        let index;
        do {
          index = Math.floor(Math.random() * scrambledArray.length);
        } while (completedIndexes.has(index));

        const currentChar = scrambledArray[index];

        if (currentChar.match(/[a-zA-Z]/)) {
          scrambledArray[index] = String.fromCharCode(
            currentChar.charCodeAt(0) + 1
          );
        }

        completedIndexes.add(index);
      }

      textElement.textContent = scrambledArray.join("");

      if (completedIndexes.size === scrambledArray.length) {
        clearInterval(interval);
        unscrambleButton.style.display = "inline-block";
      }
    }, 5);
  }

  // Init
  textElement.textContent = scrambleText(originalText);
  unscrambleButton.style.display = "inline-block";
  rescrambleButton.style.display = "none";

  unscrambleButton.addEventListener("click", unscrambleText);
  rescrambleButton.addEventListener("click", rescrambleText);
});
