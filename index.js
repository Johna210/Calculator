// import { parseInput } from "./calculator";

const calculator = document.getElementById("calculator");
const input = document.getElementById("input-display");
const output = document.getElementById("output-display");
const touch = document.getElementById("touch");
const del = document.getElementById("delete");

const numericRegex = /^\d+(?:\.\d+)?$/;
let stack = [];

// For following a number that may or may not be typed fully
let currNum = "";
let curr = false;
let dotStart = false;

touch.addEventListener("click", (e) => {
    e.preventDefault();
    const action = e.target.id;
    console.log(stack);
    if (action !== "touch" && action.length > 0) {
        display();
        if (isNumeric(action)) {
            if (input.textContent.length >= 16) {
                input.style.fontSize = "20px";
            }
            currNum += action;
            input.textContent += action;

            if (!curr) {
                stack.push(currNum);
                curr = true;
            } else {
                stack.pop();
                stack.push(currNum);
            }
        } else if (action === "clear") {
            input.textContent = "";
            clearInputs();
        } else if (action) {
            let op = operations(action);

            if (op === "(" || op === ")") {
            } else if (op === "=") {
                equals();
            } else if (op === "-/+") {
                negation();
            } else if (op === ".") {
                dotStart = true;
                currNum += ".";
                input.textContent += ".";
            } else {
                curr = false;
                dotStart = false;
                stack.push(op);
                currNum = "";
                input.textContent += op;
            }
        }
    }
    display();
    displayAnswer(stack);
});

del.addEventListener("click", () => {
    stack.pop();
    display();
});

// For parsing operators from id's
function operations(value) {
    if (value === "bracket" && !isBracket) {
        isBracket = true;
        return "(";
    } else if (value === "bracket" && isBracket) {
        isBracket = false;
        return ")";
    } else if (value === "multiple") {
        return "*";
    } else if (value === "division") {
        return "/";
    } else if (value === "percentage") {
        return "%";
    } else if (value === "dot") {
        return ".";
    } else if (value === "addition") {
        return "+";
    } else if (value === "subtract") {
        return "-";
    } else if (value === "equals") {
        return "=";
    } else if (value === "negation") {
        return "-/+";
    } else {
        return;
    }
}

function display() {
    input.textContent = "";
    input.style.color = "#f2ba97";
    stack.forEach((ele) => {
        input.textContent += ele;
    });
}

function displayAnswer(stack) {
    let answer = Answer(stack);

    // Display answer in the output
    output.textContent = answer;
}

function Answer(stack) {
    // Parse the input into operands and operators
    const values = parseInput(stack);

    operands = values[0];
    operators = values[1];

    let answer = calculate(operands, operators);
    return answer;
}

function equals() {
    let answer = Answer(stack);

    input.textContent = answer;
    input.style.color = "#8bafcf";
    stack = [];
    output.textContent = "";

    // Fill the stack and the current number with the answer
    stack = [answer];
    currNum = answer;
    curr = true;
}

function clearInputs() {
    currNum = "";
    curr = false;
    stack = [];
}
