const txtResult = document.querySelector("#result");

var buffer = 0;
var newValue = 0;

var hasBuffer = false;
var shouldReset = false;
var hasDot = false;

var expression = "0";

const Operation = {
    None: 0,
    Multiply: 1,
    Divide: 2,
    Add: 3,
    Substract: 4,
    Invert: 5,
    Equals: 6,
};
var previousOperation = Operation.None;

const allClear = () => {
    buffer = 0;
    newValue = 0;
    hasBuffer = false;
    shouldReset = false;
    previousOperation = Operation.None;
    selectedOperation = Operation.None;
    expression = "0";
    txtResult.innerText = expression;
};

const performOperation = (operation, value) => {
    switch (operation) {
        case Operation.Multiply:
            multiply(value);
            break;
        case Operation.Divide:
            divide(value);
            break;
        case Operation.Add:
            add(value);
            break;
        case Operation.Substract:
            substract(value);
            break;
        case Operation.Invert:
            invert(value);
            break;
        default:
            break;
    }
    expression = buffer + "";
};

const evaluateExpression = () => {
    if (expression[length - 1] === ".") {
        expression = expression.substring(0, expression[expression.length - 1]);
    }

    return Number(expression);
};

const handleOperation = (operation) => {
    if (previousOperation === Operation.None && operation === Operation.Equals)
        return;

    shouldReset = true;

    if (!hasBuffer) {
        buffer = newValue;
        hasBuffer = true;
        previousOperation = operation;
        return;
    }

    if (operation !== previousOperation && operation !== Operation.Equals) {
        performOperation(previousOperation, newValue);
        updateText(true);
        previousOperation = operation;
        return;
    } else {
        performOperation(previousOperation, newValue);
        newValue = evaluateExpression();
        hasBuffer = false;
    }

    updateText(true);
};

const divide = (val) => {
    buffer = Math.round((buffer / val) * 100) / 100;
};

const multiply = (val) => {
    buffer = Math.round(buffer * val * 100) / 100;
};

const add = (val) => {
    buffer = Math.round((buffer + val) * 100) / 100;
};

const substract = (val) => {
    buffer = Math.round((buffer - val) * 100) / 100;
};

const invert = (val) => {
    buffer = val * -1;
};

const canDot = () => {
    return !expression.includes(".");
};

const enterDigit = (value) => {
    if (shouldReset) {
        expression = "0";
        shouldReset = false;
    }
    if (expression.length === 15) return;
    if (value === ".") {
        if (canDot()) {
            expression += ".";
        }
    } else if (value === 0 && expression === "0") return;
    else if (expression === "0") {
        expression = value + "";
    } else expression += value;

    newValue = evaluateExpression();
    updateText(false);
};

const backspace = () => {
    if (expression.length > 1)
        expression = expression.substring(0, expression.length - 1);
    else {
        expression = "0";
        hasBuffer = false;
    }
    newValue = evaluateExpression();
    updateText(false);
};

const updateText = (fromBuffer) => {
    if (!fromBuffer) txtResult.innerText = expression;
    else txtResult.innerText = buffer + "";
};
