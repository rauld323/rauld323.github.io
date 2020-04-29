//need to add more buttons and fix the minus button.

let calcTotal = 0;
let userInput = "0";
let previousOperator;
const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if (userInput === "0") {
        userInput = value;
    } else {
        userInput += value;
    }
}

function handleMath(value) {
    if (userInput === "0") {
        // do nothing
        return;
    }

    const intuserInput = parseInt(userInput);
    if (calcTotal === 0) {
        calcTotal = intuserInput;
    } else {
        flushOperation(intuserInput);
    }

    previousOperator = value;

    userInput = "0";
}

function flushOperation(intuserInput) {
    if (previousOperator === "+") {
        calcTotal += intuserInput;
    } else if (previousOperator === "-") {
        calcTotal -= intuserInput;
    } else if (previousOperator === "×") {
        calcTotal *= intuserInput;
    } else {
        calcTotal /= intuserInput;
    }
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            userInput = "0";
            calcTotal = 0;
            break;
        case "=":
            if (previousOperator === null) {
                // need two numbers to do math
                return;
            }
            flushOperation(parseInt(userInput));
            previousOperator = null;
            userInput = +calcTotal;
            calcTotal = 0;
            break;
        case "←":
            if (userInput.length === 1) {
                userInput = "0";
            } else {
                userInput = userInput.substring(0, userInput.length - 1);
            }
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(value);
            break;
    }
}

function rerender() {
    screen.innerText = userInput;
}

function init() {
    document.querySelector(".calc-buttons").addEventListener("click", function (event) {
        buttonClick(event.target.innerText);
    });
}

init();