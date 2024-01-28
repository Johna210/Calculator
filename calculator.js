const numericRegex = /^\d+(?:\.\d+)?$/;

function isNumeric(str) {
    return numericRegex.test(str);
}

function parseInput(notation) {
    operands = [];
    operators = [];

    for (let i = 0; i < notation.length; i++) {
        if (isNumeric(notation[i])) {
            operands.push(notation[i]);
        } else {
            operators.push(notation[i]);
        }
    }

    return [operands, operators];
}

function sortOperators(ops) {
    const copyOps = JSON.parse(JSON.stringify(ops));

    precedence = {
        "*": 1,
        "/": 1,
        "+": 2,
        "-": 2,
    };
    copyOps.sort((a, b) => precedence[a] - precedence[b]);

    return copyOps;
}

function calculate(nums, ops) {
    let calculatedStack = [nums[0]];

    while (nums.length > 1) {
        if (nums.length === 1) {
            break;
        }
        calculatedStack = [nums[0]];
        const sortedOps = sortOperators(ops);

        let i = 1;
        let first = 0;
        let second = 0;

        while (i < nums.length) {
            calculatedStack.push(nums[i]);

            // console.log(ops, sortedOps);

            while (ops[first] !== sortedOps[second] && first < ops.length - 1) {
                first += 1;
                i += 1;
                calculatedStack.push(nums[i]);
            }

            let rightOp = calculatedStack.pop();
            let leftOp = calculatedStack.pop();
            let operator = ops[first];

            calculatedStack.push(evaluate(leftOp, rightOp, operator));

            ops.splice(first, 1);
            sortedOps.shift();
            i += 1;
        }
        nums = calculatedStack;
    }

    return calculatedStack[0];
}

function isNumeric(str) {
    return numericRegex.test(str);
}

function evaluate(a, b, operator) {
    if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    } else if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return substract(a, b);
    }
}

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function substract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}

function percentage(a) {
    return parseFloat(a) / 100;
}
