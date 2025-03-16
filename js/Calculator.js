const display = document.getElementById("display");
const buttons = document.querySelectorAll(".key");

let currentExpression = "";
let isOperatorClicked = false;

function clearDisplay() {
  display.value = "";
  currentExpression = "";
  isOperatorClicked = false;
}

function calculateResult() {
    if (currentExpression.includes("/0")) {
      display.value = "Error"; 
      currentExpression = "";
    } else {
      try {
        display.value = eval(currentExpression); 
        currentExpression = display.value;
        isOperatorClicked = false; 
      } catch {
        display.value = "Error";
        currentExpression = "";
      }
    }
  }
  

function handleOperator(value) {
  if (currentExpression !== "") {
    currentExpression += value;
    isOperatorClicked = true;
  }
}

function handleNumber(value) {
  if (isOperatorClicked) {
    display.value = "";
    isOperatorClicked = false;
  }
  display.value += value;
  currentExpression += value;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
        clearDisplay();
      } else if (value === "=") {
        calculateResult();
      } else {
        switch (value) {
          case "+":
          case "-":
          case "*":
          case "/":
            handleOperator(value);
            break;
          default:
            handleNumber(value);
        }
      }
  });
});