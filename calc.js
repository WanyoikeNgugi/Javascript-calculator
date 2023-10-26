console.log("Javascript Calculator Made by James Ngugi");

let flag = 0;

function isNumber(char) {
  return /^\d$/.test(char);
}

document.getElementById("answer").readOnly = true;
let screen = document.getElementById("answer");
buttons = document.querySelectorAll("button");
let screenValue = "";
let lastScreenValue = "";
let maxItems = 6;
let isSign = true;

for (item of buttons) {
  item.addEventListener("click", (e) => {
    buttonText = e.target.innerText;
    if (buttonText == "*" && !isSign) {
      if (flag == 1) {
        flag = 0;
      }
      buttonText = "*";
      isSign = true;
      screenValue += buttonText;
      screen.value = screenValue;
    } else if (buttonText == "C") {
      if (flag == 1) {
        flag = 0;
      }
      screenValue = "";
      screen.value = screenValue;
      screen.classList.remove("negative");
      isSign = true;
    } else if (buttonText == "=") {
      checkForBracketMulti();
      if (parseFloat(screen.value) < 0) {
        screen.classList.add("negative");
      } else {
        screen.classList.remove("negative");
      }
    } else if (buttonText == "(" || buttonText == ")") {
      if (flag == 1) {
        flag = 0;
      }
      screenValue += buttonText;
      screen.value = screenValue;
    } else if (isNumber(buttonText)) {
      if (flag == 1) {
        screenValue = buttonText;
        flag = 0;
      } else {
        screenValue += buttonText;
      }
      screen.value = screenValue;
      isSign = false;
      screen.classList.remove("negative");
    } else if (buttonText == "CE") {
      if (flag == 1) {
        flag = 0;
      }
      screenValue = screenValue.slice(0, -1);
      screen.value = screenValue;
      screen.classList.remove("negative");
      isSign = true;
    } else if (buttonText == "-") {
      if (flag == 1) {
        flag = 0;
      }
      screenValue += buttonText;
      screen.value = screenValue;
      isSign = false;
    } else if (["sin", "cos", "tan"].includes(buttonText)) {
      const inputValue = parseFloat(screen.value);
      if (!isNaN(inputValue)) {
        const radians = inputValue * (Math.PI / 180);
        switch (buttonText) {
          case "sin":
            screenValue = Math.sin(radians).toString();
            break;
          case "cos":
            screenValue = Math.cos(radians).toString();
            break;
          case "tan":
            screenValue = Math.tan(radians).toString();
            break;
        }
        screen.value = screenValue;
        isSign = false;
        screen.classList.remove("negative");
      }
    } else if (["cosh", "sinh", "tanh"].includes(buttonText)) {
      const inputValue = parseFloat(screen.value);
      switch (buttonText) {
        case "cosh":
          screenValue = Math.cosh(inputValue).toString();
          break;
        case "sinh":
          screenValue = Math.sinh(inputValue).toString();
          break;
        case "tanh":
          screenValue = Math.tanh(inputValue).toString();
          break;
      }
      screen.value = screenValue;
      isSign = false;
      screen.classList.remove("negative");
    } else if (["sin⁻¹", "cos⁻¹", "tan⁻¹"].includes(buttonText)) {
      const inputValue = parseFloat(screen.value);
      switch (buttonText) {
        case "sin⁻¹":
          if (inputValue >= -1 && inputValue <= 1) {
            screenValue = Math.asin(inputValue).toString();
            screenValue = (screenValue * 180) / Math.PI;
          } else {
            screenValue = "Invalid input";
          }
          break;
        case "cos⁻¹":
          if (inputValue >= -1 && inputValue <= 1) {
            screenValue = Math.acos(inputValue).toString();
            screenValue = (screenValue * 180) / Math.PI;
          } else {
            screenValue = "Invalid input";
          }
          break;
        case "tan⁻¹":
          screenValue = Math.atan(inputValue).toString();
          screenValue = (screenValue * 180) / Math.PI;
          break;
      }
      screen.value = screenValue;
      isSign = false;
      screen.classList.remove("negative");
    } else if (["sinh⁻¹", "cosh⁻¹", "tanh⁻¹"].includes(buttonText)) {
      const inputValue = parseFloat(screen.value);
      switch (buttonText) {
        case "sinh⁻¹":
          screenValue = Math.asinh(inputValue).toString();
          break;
        case "cosh⁻¹":
          if (inputValue >= 1) {
            screenValue = Math.acosh(inputValue).toString();
          } else {
            screenValue = "invalid input";
          }
          break;
        case "tanh⁻¹":
          if (inputValue >= -1 && inputValue <= 1) {
            screenValue = Math.atanh(inputValue).toString();
          } else {
            screenValue = "Invalid input";
          }
          break;
      }
      screen.value = screenValue;
      isSign = false;
      screen.classList.remove("negative");
    } else if (["xⁿ", "√", "∛"].includes(buttonText)) {
      if (flag == 1) {
        flag = 0;
      }
      screenValue += buttonText + "(";
      screen.value = screenValue;
    } else if (buttonText === "=") {
      if (screenValue.includes("√(")) {
        const valueInSqrt = screenValue.match(/√\(([^)]+)\)/);
        console.log(valueInSqrt);
        /* if (valueInSqrt) {
          const number = parseFloat(valueInSqrt[1]);
          console.log(number);
          if (number >= 0) {
            screenValue = "√(" + Math.sqrt(number).toString() + ")";
            console.log(screenValue);
          } else {
            screenValue = "Invalid input";
          }
        }*/
      } else if (screenValue.includes("∛(")) {
        const valueInCbrt = screenValue.match(/∛\(([^)]+)\)/);
        if (valueInCbrt) {
          const number = parseFloat(valueInCbrt[1]);
          screenValue = "∛(" + Math.cbrt(number).toString() + ")";
        }
      } else if (screenValue.includes("xⁿ(")) {
        const valueInPower = screenValue.match(/xⁿ\(([^)]+),([^)]+)\)/);
        if (valueInPower) {
          const base = parseFloat(valueInPower[1]);
          const exponent = parseFloat(valueInPower[2]);
          screenValue = "xⁿ(" + Math.pow(base, exponent).toString() + ")";
        }
      }
      screen.value = screenValue;
      isSign = false;
      screen.classList.remove("negative");
    } else {
      if (flag == 1) {
        flag = 0;
      }
      if (!isSign) {
        screenValue = screen.value + buttonText;
        screen.value = screenValue;
        isSign = true;
      }
      screen.classList.remove("negative");
    }
  });
}

document.addEventListener("keydown", function (event) {
  // ... (same code as before)
});

window.onerror = function () {
  alert("PLEASE INPUT A VALID EXPRESSION");
  screenValue = "";
  screen.value = screenValue;
  screen.classList.remove("negative");
  console.clear();
};

function checkForBracketMulti() {
  // ... (same code as before)

  if (eval(screenValue) !== undefined) {
    screen.value = eval(screenValue);
    lastScreenValue = screenValue;
    screenValue = screen.value;
    if (parseFloat(screen.value) < 0) {
      screen.classList.add("negative");
    } else {
      screen.classList.remove("negative");
    }
    // ... (same code as before)
  }
  flag = 1;
}
document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace" || event.key === "Delete") {
    const answer = document.getElementById("answer");
    let currentValue = answer.value;

    if (currentValue.length > 0) {
      currentValue = currentValue.slice(0, -1);
      answer.value = currentValue;
      screenValue = currentValue;
    }
  }
});
