// initializing all the DOM elements
let start = document.getElementById('startMenu');
let problemContent = document.getElementById('problemContent');
let quizNumber = document.getElementById('quizNumber');
let showScore = document.getElementById('score');
let end = document.getElementById('endMenu');

// initializing local variables
let run = false;
let score = 0;
let count = 1;
// const variable that doesn't change
const nQuiz = 4;
// array for random number of problems
let prob = [];
//used for quiz end check
let play = true;
// the sample problems
let problems = [
    {
        question: "Original Name of JavaScript is",
        options: ["JavaScript", "LiveScript", "EScript", "Mocha"],
        answer: 3
    },
    {
        question: "Purpose of designing the JavaScript",
        options: ["To Perform Server Side Scripting Operation", "To add interactivity to HTML Pages", "To Style HTML Pages", "All of the above"],
        answer: 1
    },
    {
        question: "Why so JavaScript and Java have similar name?",
        options: ["They both originated on the island of Java", "JavaScript's syntax is loosely based on Java's", "Both A and B", "None of the above"],
        answer: 1
    },
    {
        question: "Which type of language is Javascript",
        options: ["Programming", "Scripting", "Markup", "None of the above"],
        answer: 1
    },
    {
        question: "Which declaration does JavaScript use?",
        options: ["let", "var", "const", "All of the above"],
        answer: 3
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<scripting>", "<javascript>", "<script>", "<js>"],
        answer: 2
    },
    {
        question: "How can you add a comment in a JavaScript?",
        options: ["//comment", "<!--comment-->", "'comment", "None of above"],
        answer: 0
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ["onmouseclick", "onmouseover", "onclick", "onchage"],
        answer: 2
    }];
// ======================================================
// functions
// make random index for quiz problems
function problemNumber() {
    let prob = [];
    let i = 0;
    while (i < 4) {
        let n = Math.floor(Math.random() * 8);
        // check for same number
        if (!sameNum(n)) {
            prob.push(n);
            i++;
        }
    }
    // return true if same number
    function sameNum(n) {
        for (let i = 0; i < prob.length; i++) {
            if (n === prob[i]) {
                return true;
            }
        }
        return false;
    } // end sameNum

    return prob;
} // end problemNumber

// set List items and Question of Quiz problems
function setLi(problem) {
    // set Question
    let question = document.getElementById('question');
    question.innerText = problem.question; // end set Question

    // set List items
    let li = document.getElementsByTagName('li');
    let markStart = 'A'.charCodeAt(0);

    for (let i = 0; i < nQuiz; i++) {
        // set marker starting with A
        let marker = document.createElement('span');
        marker.className = 'marker';
        marker.innerText = String.fromCharCode(markStart + i);
        li[i].appendChild(marker); // end set marker

        // set the options for question
        let option = document.createElement('span');
        option.className = 'option';
        option.innerText = problem.options[i];
        li[i].appendChild(option); // end set options

        // if running for first time add click event listener
        if (!run) {
            console.log("Now run...");
            li[i].addEventListener('click', nextQuestion);

            // function for reaction and setting the next question
            function nextQuestion() {
                console.log("count: ", count);
                console.log("Prob Num: " + prob[count - 1] + "| answer: " + problems[prob[count - 1]].answer + "| selected: " + i)
                // set reaction
                // if correct
                if (problems[prob[count - 1]].answer === i) {
                    score++;
                    showScore.textContent = score + "";
                    li[i].style.backgroundColor = "green";
                }
                // if wrong
                else {
                    li[i].style.backgroundColor = "red";
                } // end reaction

                // check quiz end & set next questions
                setTimeout(function () {
                    count++;
                    // if quiz end show End Menu page
                    if (count > nQuiz) {
                        // set End state
                        play = false;
                        li[i].style.backgroundColor = "white";
                        let totalScore = document.getElementById('totalScore');
                        totalScore.innerText = "Total score: " + score;
                        changeState();
                        // clear the list
                        clearLi();
                    }
                    // set next question
                    else {
                        // reset reaction & change progress bar
                        quizNumber.textContent = count + "/" + nQuiz;
                        move();
                        li[i].style.backgroundColor = "white";
                        // clear the list
                        clearLi();
                        // set next question
                        setLi(problems[prob[count - 1]])
                    }
                }, 1000); // end check and set
            } // end nextQuestion
        } // end add event listener
    } // end set List items
    // system ran
    run = true;
} // end setLi

// clear List items
function clearLi() {
    let li = document.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
        while (li[i].hasChildNodes()) {
            li[i].removeChild(li[i].firstChild);
        }
    }
} // end clearLi

// change progress bar
function move() {
    let progress = document.getElementById("progressNow");
    progress.style.width = count / nQuiz * 100 + '%';
} // end move

// initialize Quiz
function setQuiz() {
    prob = problemNumber();
    showScore.textContent = score + "";
    quizNumber.textContent = count + "/" + nQuiz;

    move();
    setLi(problems[prob[count - 1]]);
} // end setQuiz

// change page based on state( play / end )
function changeState() {
    // if end( = !play), show End Menu
    if (!play) {
        play = true;
        score = 0;
        count = 1;
        problemContent.hidden = true;
        end.hidden = false;
    }
    // if play, show Quiz Page
    else {
        setTimeout(function () {
            console.log("Now play.");
            start.hidden = true;
            end.hidden = true;
            problemContent.hidden = false;
            setQuiz();
        }, 1000);
    }
} // end changeState