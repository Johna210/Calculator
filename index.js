const calculator = document.getElementById("calculator");
const input = document.getElementById("input-display");
const output = document.getElementById("output-display");
const touch = document.getElementById("touch");

const numericRegex = /^\d+(?:\.\d+)?$/;
let write = false;
let leftOperand = "";
let rightOperand = "";

touch.addEventListener("click", (e) => {
    e.preventDefault();
    const action = e.target.id;

    if (isNumeric(action)) {
        input.textContent += action;
        if (input.textContent.length >= 16) {
            input.style.fontSize = "20px";
        }
    } else if (action === "clear") {
        input.textContent = "";
    } else {
        leftOperand = input.textContent;
        input.innerText = "";
        operation = action;
    }

    if (leftOperand) {
        rightOperand = input.textContent;
    }

    output.textContent = add(leftOperand, rightOperand);
});

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
