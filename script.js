// ================================
// script.js — Calculator + Theme
// ================================

/* ---------- Elements ---------- */
const display = document.getElementById("display");

const modeSwitch = document.getElementById("modeSwitch"); 
const switchLabel = document.querySelector('label[for="modeSwitch"]');

// ---------- Calculator Logic ---------- //
function appendValue(value) {
  
  const operators = ["+", "-", "*", "/"];
  const lastChar = display.value.slice(-1);

  // avoid two operators in a row
  if (operators.includes(value) && operators.includes(lastChar)) return;

  // avoid multiple leading zeros like "00"
  if (display.value === "0" && value === "0") return;

  // if display is "0" and a number (not ".") is pressed, replace 0
  if (display.value === "0" && !isNaN(value) && value !== ".") {
    display.value = value;
    return;
  }

  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {

    const result = new Function("return " + (display.value || "0"))();
    // Avoid showing undefined / NaN — show Error instead
    if (result === Infinity || Number.isNaN(result)) {
      display.value = "Error";
    } else {
      display.value = String(result);
    }
  } catch {
    display.value = "Error";
  }
}

/* ---------- Keyboard Support ---------- */
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key)) {
    appendValue(key);
    return;
  }

  if (["+", "-", "*", "/"].includes(key)) {
    appendValue(key);
    return;
  }

  if (key === "." ) {
    appendValue(key);
    return;
  }

  if (key === "Enter") {
    e.preventDefault();
    calculateResult();
    return;
  }

  if (key === "Backspace") {
    deleteLast();
    return;
  }

  if (key.toLowerCase() === "c") {
    clearDisplay();
    return;
  }
});

/* ---------- Theme Toggle (checkbox) ---------- */


function updateThemeUI(checked) {
  document.body.classList.toggle("light-mode", checked);

  // update visible icon inside the label (so user sees moon/sun)
  if (switchLabel) {
    switchLabel.textContent = checked ? "🌞" : "🌙";
  }
}

// init on load — ensure icon matches the checkbox state
if (modeSwitch) {
  updateThemeUI(modeSwitch.checked);

  // when user toggles checkbox (clicking the label also toggles), update theme
  modeSwitch.addEventListener("change", (e) => {
    updateThemeUI(e.target.checked);
  });
} else {
  // fallback: if checkbox is missing, ensure label doesn't throw errors
  if (switchLabel) switchLabel.textContent = "🌙";
}

/* ---------- Expose functions to global scope for HTML onclick ---------- */
window.appendValue = appendValue;
window.clearDisplay = clearDisplay;
window.deleteLast = deleteLast;
window.calculateResult = calculateResult;

/* ================================
   End of script.js
   ================================ */
    
