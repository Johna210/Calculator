// import { parseInput } from "./calculator";

const calculator = document.getElementById("calculator");
const input = document.getElementById("input-display");
const output = document.getElementById("output-display");
const touch = document.getElementById("touch");
const del = document.getElementById("delete");

const numericRegex = /^\d+(?:\.\d+)?$/;
let leftOperand = "";
let rightOperand = "";
let stack = [];
let isNegated = false;
let currNum = "";

touch.addEventListener("click", (e) => {
    e.preventDefault();
    const action = e.target.id;
    if (action !== "touch" && action.length > 0) {
        if (isNumeric(action)) {
            if (input.textContent.length >= 16) {
                input.style.fontSize = "20px";
            }
            currNum += action;
            input.textContent += action;
        } else if (action === "clear") {
            input.textContent = "";
            stack = [];
        } else if (action) {
            let op = operations(action);

            if (op === "(" || op === ")") {
            } else {
                stack.push(currNum);
                stack.push(op);
                currNum = "";
                input.textContent += op;
            }
        }

        const values = parseInput(stack);

        calculate(values[0], values[1]);

        const operators = values[1];
    } else {
        stack[-1] = currNum;
        input.textContent += currNum;
        currNum = "";
    }

    console.log(stack);
});

del.addEventListener("click", () => {
    stack.pop();
    display();
});

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
    } else {
        return;
    }
}

function display() {
    input.textContent = "";
    stack.forEach((ele) => {
        input.textContent += ele;
    });
}
