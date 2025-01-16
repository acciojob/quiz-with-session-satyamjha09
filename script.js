/***********************************************************
  1. SETUP: Load user’s progress from session storage
************************************************************/
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Grab the key elements in the DOM
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

/***********************************************************
  2. DO NOT CHANGE CODE BELOW THIS LINE
  (It displays the questions on the screen)
************************************************************/
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    // Show the question text
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    questionElement.appendChild(document.createElement("br"));

    // Show each choice as a radio button
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // If userAnswers already has a value for this question, mark it checked
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Attach the text for the choice
      const choiceText = document.createTextNode(choice);

      // Append them to the question container
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
    questionsElement.appendChild(document.createElement("hr"));
  }
}
renderQuestions();
/***********************************************************
  END OF "DO NOT CHANGE" BLOCK
************************************************************/


/***********************************************************
  3. Add Radio-Button Change Listeners to Save Answers
************************************************************/
function setupChangeListeners() {
  // Select all radio inputs we just rendered
  const allRadioButtons = document.querySelectorAll('input[type="radio"]');

  allRadioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      // e.g., "question-0" -> 0
      const questionIndex = parseInt(radio.name.split("-")[1], 10);
      // Update userAnswers with the selected choice
      userAnswers[questionIndex] = radio.value;

      // Persist updated answers in session storage
      sessionStorage.setItem("progress", JSON.stringify(userAnswers));
    });
  });
}

// Call the function after questions have been rendered
setupChangeListeners();


/***********************************************************
  4. Handle Submit: Calculate Score, Show It, Save to Local
************************************************************/
submitButton.addEventListener("click", () => {
  let score = 0;

  // Compare user’s selected answers to each question's correct answer
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display the score on the page
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // Also store the final score in local storage
  localStorage.setItem("score", score);
});

