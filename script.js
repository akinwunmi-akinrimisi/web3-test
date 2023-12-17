const quizQuestions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Rome"],
      correctAnswer: 0
    },
    {
      question: "What is the largest planet in our solar system?",
      choices: ["Jupiter", "Saturn", "Neptune", "Earth"],
      correctAnswer: 0
    },
    {
      question: "Which country is known as the 'Land of the Rising Sun'?",
      choices: ["China", "Japan", "India", "Brazil"],
      correctAnswer: 1
    },
    {
      question: "What is the chemical symbol for gold?",
      choices: ["Go", "Au", "Ag", "Gd"],
      correctAnswer: 1
    },
    {
      question: "Who painted the Mona Lisa?",
      choices: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
      correctAnswer: 0
    },
    {
      question: "Which year was the first iPhone released?",
      choices: ["2005", "2007", "2010", "2013"],
      correctAnswer: 1
    },
  ];
  
  // DOM elements
  const questionElement = document.getElementById("question");
  const choicesForm = document.getElementById("choices-form");
  const feedbackElement = document.getElementById("feedback");
  const progressElement = document.getElementById("progress"); 
  const answeredElement = document.getElementById("answered"); 
  const totalElement = document.getElementById("total"); 
  const nextButton = document.getElementById("next-btn");
  const showResultButton = document.getElementById("show-result-btn");
  
  let currentQuestion = 0;
  let userAnswers = [];
  
  // Load the current question
  function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    questionElement.textContent = question.question;
  
    choicesForm.innerHTML = ""; 
  
    question.choices.forEach((choice, index) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = index;
      input.addEventListener("click", () => checkAnswer(index));
  
      const label = document.createElement("label");
      label.textContent = choice;
  
      const li = document.createElement("li");
      li.appendChild(input);
      li.appendChild(label);
  
      choicesForm.appendChild(li);
    });
  
    feedbackElement.textContent = "";
    nextButton.disabled = true;

      // Update progress
  answeredElement.textContent = currentQuestion;
  totalElement.textContent = quizQuestions.length;
  }
  
  // Check the selected answer
  function checkAnswer(choiceIndex) {
    const question = quizQuestions[currentQuestion];
    userAnswers[currentQuestion] = choiceIndex;
    nextButton.disabled = false;
  }
  
  // Move to the next question
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      loadQuestion();
    } else {
        showResultButton.style.display = "block";
        nextButton.style.display = "none";
    }
  }
  

// Show quiz result
function showResult() {
    feedbackElement.innerHTML = ""; 
    let correctAnswers = 0;
  
    quizQuestions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      const li = document.createElement("li");
  
      li.textContent = `${index + 1}. ${question.question} - Your Answer: ${
        question.choices[userAnswer]
      }, Correct Answer: ${question.choices[question.correctAnswer]}`;
  
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
        li.classList.add("correct-answer");
      } else {
        li.classList.add("wrong-answer");
      }
  
      feedbackElement.appendChild(li);
    });
  
    const percentage = (correctAnswers / quizQuestions.length) * 100;
    feedbackElement.innerHTML += `<p>Your final score: ${percentage.toFixed(2)}%</p>`;
  }


  
  // Event listeners
  nextButton.addEventListener("click", nextQuestion);
  showResultButton.addEventListener("click", showResult);
  
  // Start the quiz
  loadQuestion();
  
  