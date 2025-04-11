const el = document.getElementById("scramble");

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
let originalText = el.textContent;

el.addEventListener("mouseover", () => {
  let iterations = 0;
  const interval = setInterval(() => {
    el.textContent = originalText
      .split("")
      .map((letter, i) => {
        if (i < iterations) return originalText[i];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iterations >= originalText.length) clearInterval(interval);

    iterations += 1 / 3;
  }, 30);
});
