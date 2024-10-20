const questions = [
    {
      question: "What is the capital of France?",
      answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
      correct: 2
    },
    {
      question: "What is 2 + 2?",
      answers: ["3", "4", "5", "6"],
      correct: 1
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Earth", "Mars", "Jupiter", "Venus"],
      correct: 1
    }
  ];
  
  let currentQuestion = 0;
  let selectedAnswers = [];
  let score = 0;
  let timeLeft = 60;
  let timer;
  
  document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    startTimer();
    updateNavigationButtons();
  });
  
  function loadQuestion() {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
  
    questionElement.textContent = questions[currentQuestion].question;
    answersElement.innerHTML = '';
  
    questions[currentQuestion].answers.forEach((answer, index) => {
      const li = document.createElement('li');
      li.textContent = answer;
      li.onclick = () => selectAnswer(index);
      li.className = selectedAnswers[currentQuestion] === index ? 'selected' : '';
      answersElement.appendChild(li);
    });
  }
  
  function selectAnswer(index) {
    selectedAnswers[currentQuestion] = index;
    loadQuestion(); // Reload the question to update selected answer UI
  }
  
  function moveToNext() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion();
      updateNavigationButtons();
    } else {
      calculateScore();
      endQuiz();
    }
  }
  
  function moveToPrevious() {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
      updateNavigationButtons();
    }
  }
  
  function updateNavigationButtons() {
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    document.getElementById('next-btn').textContent = currentQuestion === questions.length - 1 ? 'Finish' : 'Next';
  }
  
  function calculateScore() {
    score = selectedAnswers.reduce((total, answer, index) => {
      return total + (answer === questions[index].correct ? 1 : 0);
    }, 0);
  }
  
  function endQuiz() {
    clearInterval(timer);
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('score').textContent = `You scored ${score} out of ${questions.length}`;
  }
  
  function restartQuiz() {
    currentQuestion = 0;
    selectedAnswers = [];
    score = 0;
    timeLeft = 60;
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
    loadQuestion();
    startTimer();
    updateNavigationButtons();
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById('time').textContent = timeLeft;
  
      if (timeLeft <= 0) {
        calculateScore();
        endQuiz();
      }
    }, 1000);
  }
  