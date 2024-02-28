document.addEventListener("DOMContentLoaded", function () {
  const display = document.querySelector(".display");

  let currentInput = "0";
  let operator = null;
  let previousInput = null;

  const btnAll = document.querySelectorAll(".btn");

  const updateDisplay = function (value) {
    const maxDisplayLength = 14;
    // Konwertuj wartość na string i skróć do określonej długości
    const stringValue = value.toString();
    const shortenedValue = stringValue.slice(0, maxDisplayLength);

    display.textContent = shortenedValue;
  };

  const handleNumberClick = function (value) {
    if (currentInput === "0" || operator) {
      currentInput = value;
    } else if (value === "." && currentInput.includes(".")) {
      return; // unikaj dodawania więcej niż jednej kropki
    } else {
      currentInput += value;
    }
    updateDisplay(currentInput);
  };

  const handleClearClick = function () {
    currentInput = "0";
    operator = null;
    previousInput = null;
    updateDisplay(currentInput);
  };

  const handleBackspaceClick = function () {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "") {
      currentInput = "0";
    }
    updateDisplay(currentInput);
  };

  const handleOperatorClick = function (value) {
    if (operator) {
      calculate();
      operator = value;
      console.log("num2 after calculate in handleOperatorClick:", currentInput);
    } else {
      operator = value;
      previousInput = currentInput;
      console.log("num1 after handleOperatorClick:", previousInput);
    }
    updateDisplay(previousInput);
  };

  const handleEqualClick = function () {
    calculate();
    operator = null;
    updateDisplay(currentInput);
  };

  const handleSquareClick = function () {
    if (currentInput !== "0") {
      currentInput = Math.pow(parseFloat(currentInput), 2);
      updateDisplay(currentInput);
    }
  };

  const handleSqrtClick = function () {
    if (currentInput !== "0") {
      currentInput = Math.sqrt(parseFloat(currentInput));
    }
    updateDisplay(currentInput);
  };

  btnAll.forEach((button) =>
    button.addEventListener("click", function () {
      const value = button.dataset.value;

      if (!isNaN(parseFloat(value)) || value === ".") {
        handleNumberClick(value);
      } else if (value === "C") {
        handleClearClick();
      } else if (value === "B") {
        handleBackspaceClick();
      } else if (["+", "-", "*", "/", "%"].includes(value)) {
        handleOperatorClick(value);
      } else if (value === "=") {
        handleEqualClick();
      } else if (value === "^2") {
        handleSquareClick();
      } else if (value === "sqrt2") {
        handleSqrtClick();
      }
    })
  );

  const calculate = function () {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    console.log("num1:", num1);
    console.log("num2:", num2);

    if (!isNaN(num1) && !isNaN(num2)) {
      switch (operator) {
        case "+":
          currentInput = num1 + num2;
          break;
        case "-":
          currentInput = num1 - num2;
          break;
        case "*":
          currentInput = num1 * num2;
          break;
        case "/":
          if (num2 !== 0) {
            currentInput = num1 / num2;
          } else {
            currentInput = "Error";
          }
          break;
        case "%":
          currentInput = (num1 * num2) / 100;
      }
      previousInput = currentInput;
    }
    console.log("num1:", num1);
    console.log("num2:", num2);
    console.log("currentInput after calculation:", currentInput);
  };

  const calculateSquare = function () {
    const num = parseFloat(currentInput);
    if (!isNaN(num)) {
      currentInput = (num ** 2).toString();
      previousInput = currentInput;
    }
  };
});
