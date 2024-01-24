const calculator = document.getElementById("calculator");
const input = document.getElementById("input-display");
const output = document.getElementById("output-display");
const touch = document.getElementById("touch");

const numericRegex = /^\d+(?:\.\d+)?$/;
let write = false;
let leftOperand = "";
let rightOperand = "";
let stack = [];
let isBracket = false;
let isNegated = false;

touch.addEventListener("click", (e) => {
    e.preventDefault();
    const action = e.target.id;

    if (isNumeric(action)) {
        input.textContent += action;
        if (input.textContent.length >= 16) {
            input.style.fontSize = "20px";
        }
        console.log(action);
        stack.push(action);
    } else if (action === "clear") {
        input.textContent = "";
        stack = [];
    } else {
        let op = operations(action);
        stack.push(op);
        input.textContent += op;
    }

    console.log(stack);
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
    }
}

function calculate(list) {
    let copy = JSON.parse(JSON.stringify(list));
    if (list.length <= 2) {
        return;
    }

    while (copy.length > 0) {}
}

function isNumeric(str) {
    return numericRegex.test(str);
}

function add(a, b) {
    return parseInt(a) + parseInt(b);
}

function substract(a, b) {
    return parseInt(a) - parseInt(b);
}

function multiply(a, b) {
    return parseInt(a) * parseInt(b);
}

function divide(a, b) {
    return parseInt(a) / parseInt(b);
}

function percentage(a) {
    return parseInt(a) / 100;
}
