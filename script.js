// const buttonElement1 = document.getElementById('button1')
// const buttonElement2 = document.getElementById('button2')
// const buttonElement3 = document.getElementById('button3')
// const buttonElement4 = document.getElementById('button4')
const textElement = document.getElementById('textarea')
const displayElement = document.getElementById('display')
const roundElement = document.getElementById('round')
const resetElement = document.getElementById('reset')
const timerElement = document.getElementById('timer')
const resultsElement = document.getElementById('results')
const submitElement = document.getElementById('submit')

var operation = ['+', '-', '/', '*', '^']
var score = 0
var round = 0
var exp1 = 0
var exp2 = 0
var ans = 0
var oper = ''
var timeLimit = 150
var isActive = true

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function getRandomIntRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function createExpression() {
    const ind = Math.floor(Math.random() * operation.length);
    oper = operation[ind]

    if (oper === '/') {
        exp2 = getRandomInt(30)
        ans = getRandomInt(20)
        exp1 = exp2 * ans
    } else if (oper === '*') {
        exp1 = getRandomInt(30)
        exp2 = getRandomInt(10)
        ans = exp1 * exp2

    } else if (oper === '-') {
        exp1 = getRandomInt(100)
        exp2 = getRandomInt(100)
        ans = exp1 - exp2

    } else if (oper === '+') {
        exp1 = getRandomInt(100)
        exp2 = getRandomInt(100)
        ans = exp1 + exp2

    } else if (oper === '^') {
        exp2 = getRandomInt(2) + 1
        if (exp2 <= 2) {
            exp1 = getRandomInt(15)
        } else {
            exp1 = getRandomInt(10)
        }
        ans = exp1 ** exp2

    }
    displayElement.innerText = exp1.toString() + " " + oper + " " + exp2.toString()

}
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function createChoices() {
    textElement.value = ''
    textElement.focus()
    resultsElement.innerText = "Score: " + score
    roundElement.innerText = round.toString() + '/15'
    if (round === 15) {
        stop()

    } else {

        round += 1
        createExpression()

        var bias = 0
        var choices = []
        choices.push(ans)
        for (var i = 0; i < 3; i++) {
            bias = getRandomIntRange(ans - 20, ans + 20)
            choices.push(ans + bias)
        }
        // console.log(choices)
        shuffleArray(choices)
            // console.log(choices)

        // if (isActive) { startTimer() }
    }
}
let startTime

function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()

    setInterval(() => {

        if (isActive) {
            timerElement.innerText = timeLimit - getTimerTime()
        }
        if (timeLimit - getTimerTime() < 0) {

            // createChoices()
            stop();
        }


    }, 1000)

}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

function stop() {
    isActive = false
    if (score < 7) {
        timerElement.innerText = "Bad!"
    } else if (score < 12) {
        timerElement.innerText = "Good!"
    } else {
        timerElement.innerText = "Awesome!"
    }
    textElement.disabled = true
        // timerElement.
        // buttonElement1.disabled = true
        // buttonElement2.disabled = true
        // buttonElement3.disabled = true
        // buttonElement4.disabled = true
}

submitElement.addEventListener('click', () => {
    // console.log(parseInt(textElement.value))
    if (parseInt(textElement.value) === ans) {
        score += 1
    }
    createChoices()

})
textElement.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submitElement.click();
    }
})
resetElement.addEventListener('click', () => {
    round = 0
    score = 0
    isActive = true
    textElement.disabled = false
    if (isActive) { startTimer() }
    createChoices()
})
createChoices()
if (isActive) { startTimer() }