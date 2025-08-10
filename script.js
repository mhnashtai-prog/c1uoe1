document.addEventListener("DOMContentLoaded", function () {
    const menuButtons = document.querySelectorAll(".menu button");
    const quizContainer = document.getElementById("quiz-container");
    const menu = document.querySelector(".menu");
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const scoreBox = document.getElementById("score-box");

    let currentQuiz = [];
    let currentQuestionIndex = 0;
    let score = 0;

    const quizzes = {
        multipleChoice: [
            {
                question: "Choose the correct form: She _____ to the gym every morning.",
                options: ["go", "goes", "going", "gone"],
                answer: "goes"
            },
            {
                question: "Which is correct: 'I have lived here _____ 2010'?",
                options: ["since", "for", "by", "at"],
                answer: "since"
            }
        ],
        gapFill: [
            {
                question: "Fill in the blank: He _____ (work) here for 5 years.",
                options: ["worked", "works", "has worked", "is working"],
                answer: "has worked"
            }
        ],
        wordFormation: [
            {
                question: "Complete: She is a very _____ person. (CREATE)",
                options: ["creation", "creativity", "creative", "creatively"],
                answer: "creative"
            }
        ],
        sentenceTransformation: [
            {
                question: "Rewrite: 'I last saw her in 2015.' → I _____ her since 2015.",
                options: ["didn't see", "haven't seen", "don't see", "hadn't seen"],
                answer: "haven't seen"
            }
        ]
    };

    function startQuiz(type) {
        currentQuiz = quizzes[type];
        currentQuestionIndex = 0;
        score = 0;
        menu.classList.add("hidden");
        quizContainer.classList.remove("hidden");
        showQuestion();
    }

    function showQuestion() {
        const question = currentQuiz[currentQuestionIndex];
        questionEl.textContent = question.question;
        optionsEl.innerHTML = "";

        question.options.forEach(option => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "answer";
            input.value = option;
            label.appendChild(input);
            label.append(option);
            optionsEl.appendChild(label);
        });
    }

    function checkAnswer() {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (selected && selected.value === currentQuiz[currentQuestionIndex].answer) {
            score++;
        }
    }

    nextBtn.addEventListener("click", function () {
        checkAnswer();
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuiz.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    });

    prevBtn.addEventListener("click", function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
    });

    function endQuiz() {
        quizContainer.classList.add("hidden");
        scoreBox.classList.remove("hidden");
        scoreBox.textContent = `Your score: ${score} / ${currentQuiz.length}`;
    }

    menuButtons.forEach(button => {
        button.addEventListener("click", function () {
            startQuiz(button.dataset.quiz);
        });
    });
});
