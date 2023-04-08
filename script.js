const numbers = document.querySelectorAll(".number");
const currDisplay = document.querySelector("#current");
const lastDisplay = document.querySelector("#last");
const clear = document.querySelector("#clear");
const operations = document.querySelectorAll(".operation");
const equals = document.querySelector("#equals");
let firstOperand = null;
let secondOperand = null;
let operation = null;
let gotAnswer = false;
clear.addEventListener("click", executeClear);
equals.addEventListener("click", () => {
    if (firstOperand === null) {
        currDisplay.textContent = 0;
        return;
    }
    let answer = executeEval(operation, firstOperand, secondOperand);
    executeClear();
    currDisplay.textContent = answer;
    firstOperand = answer;
    gotAnswer = true;
});
numbers.forEach((number) => number.addEventListener("click", updateCurrDisplay));
operations.forEach((operation) => operation.addEventListener("click", updateOperation))
function updateCurrDisplay() {
    if (gotAnswer) {
        if (this.textContent === ".") {
            if (firstOperand === "-") {
                currDisplay.textContent = "-0."
                firstOperand = currDisplay.textContent;
                gotAnswer = false;
                return;
            }
            else {
                currDisplay.textContent = "0.";
                firstOperand = currDisplay.textContent;
                gotAnswer = false;
                return;
            }
        }
        currDisplay.textContent = "";
        gotAnswer = false;
    }
    if (firstOperand !== null && operation && currDisplay.textContent.length < 8) {
        if ((secondOperand === null || secondOperand === "0") && this.textContent.includes(".")) {
            currDisplay.textContent = "0.";
            secondOperand = currDisplay.textContent;
            return;
        }
        else if (secondOperand === "-" && this.textContent.includes(".")) {
            currDisplay.textContent = "-0.";
            secondOperand = currDisplay.textContent;
            return;
        }
        else if (this.textContent === "." && secondOperand.includes(".")) {
            return;
        }
        else if (currDisplay.textContent === "0") {
            currDisplay.textContent = this.textContent;
            secondOperand = currDisplay.textContent;
            return;
        }
        currDisplay.textContent += this.textContent;
        secondOperand = currDisplay.textContent;
    }
    else if (currDisplay.textContent === "0") {
        if (this.textContent === ".") {
            currDisplay.textContent = "0.";
            firstOperand = currDisplay.textContent;
            return;
        }
        currDisplay.textContent = this.textContent;
        firstOperand = currDisplay.textContent;
    }
    else if (currDisplay.textContent === "-") {
        if (this.textContent === ".") {
            currDisplay.textContent = "-0.";
            firstOperand = currDisplay.textContent;
            return;
        }
        currDisplay.textContent += this.textContent;
        firstOperand = currDisplay.textContent;
    }
    else if (currDisplay.textContent.length < 8) {
        if (this.textContent === "." && firstOperand.includes(".")) {
            return;
        }
        currDisplay.textContent += this.textContent;
        firstOperand = currDisplay.textContent;
    }
}
function updateOperation() {
    if (firstOperand === "ERROR") {
        executeClear();
        currDisplay.textContent = "0";
        return;
    }
    if (firstOperand === null && this.textContent === "-") {
        firstOperand = "-";
        currDisplay.textContent = "-";
        return;
    }
    else if (firstOperand === null) {
        firstOperand = "0";
    }
    else if (firstOperand === "-") {
        return;
    }
    if (firstOperand !== null && secondOperand !== null) {
        let answer = executeEval(operation, firstOperand, secondOperand);
        if (answer === "ERROR") {
            executeClear();
            firstOperand = "ERROR";
            currDisplay.textContent = 'ERROR';
            return;
        }
        firstOperand = answer;
        secondOperand = null;
    }
    else if (firstOperand === null && this.textContent === "-") {
        firstOperand = "-";
        currDisplay.textContent = "-";
        return;
    }
    else if (operation !== null && secondOperand === null && this.textContent === "-") {
        secondOperand = "-";
        currDisplay.textContent = "-";
        return;
    }
    if (firstOperand.charAt(firstOperand.length - 1) === ".") {
        firstOperand = firstOperand.slice(undefined, firstOperand.length - 1);
    }
    currDisplay.textContent = "";
    operation = this.textContent;
    lastDisplay.textContent = `${firstOperand} ${operation}`;
}
function executeClear() {
    currDisplay.textContent = "0";
    lastDisplay.textContent = "";
    firstOperand = null;
    secondOperand = null;
    operation = null;
}
function add(a, b) {
    let answer = String(Math.floor((a + b) * 1000000000000000) / 1000000000000000);
    if (answer.length > 14) {
        String(answer = Number.parseFloat(answer).toExponential(7));
    }
    return answer;
}
function subtract(a, b) {
    let answer = String(Math.floor((a - b) * 1000000000000000) / 1000000000000000);
    if (answer.length > 14) {
        String(answer = Number.parseFloat(answer).toExponential(7));
    }
    return answer;
}
function multiply(a, b) {
    let answer = String(Math.floor((a * b) * 1000000000000000) / 1000000000000000);
    if (answer.length > 14) {
        String(answer = Number.parseFloat(answer).toExponential(7));
    }
    return answer;
}
function divide(a, b) {
    let answer = String(Math.floor((a / b) * 1000000000000000) / 1000000000000000);
    if (answer.length > 14) {
        String(answer = Number.parseFloat(answer).toExponential(7));
    }
    return answer;
}
function executeEval(operation, firstOperand, secondOperand) {
    if (secondOperand === "0" || secondOperand === "0." && operation === "/") {
        return "ERROR";
    }
    if (secondOperand === null) {
        if (firstOperand.charAt(firstOperand.length - 1) === ".") {
            firstOperand = firstOperand.slice(undefined, firstOperand.length - 1);
        }
        return firstOperand;
    }
    if (firstOperand.includes(".") || secondOperand.includes(".")) {
        a = Number.parseFloat(firstOperand);
        b = Number.parseFloat(secondOperand);
    }
    else {
        a = Number.parseInt(firstOperand);
        b = Number.parseInt(secondOperand);
    }
    switch (operation) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "x": return multiply(a, b);
        case "/": return divide(a, b);
    }
}