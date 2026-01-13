// Quiz Logic with Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('quizApp', () => ({
    quizData: null,
    currentTopic: null,
    currentQuiz: null,
    userAnswers: {},
    showResults: false,
    score: 0,
    totalTime: 0,
    startTime: null,
    showExplanations: false,
    
    async init() {
      // Загружаем данные тестов
      try {
        const response = await fetch('/js/quiz-data.json');
        this.quizData = await response.json();
      } catch (error) {
        console.error('Ошибка загрузки данных тестов:', error);
      }
    },
    
    loadQuiz(topicKey) {
      this.currentTopic = topicKey;
      this.currentQuiz = this.quizData[topicKey];
      this.userAnswers = {};
      this.showResults = false;
      this.score = 0;
      this.startTime = Date.now();
      this.totalTime = 0;
      this.showExplanations = false;
      
      // Плавная прокрутка к началу
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    selectAnswer(questionIndex, optionIndex) {
      this.userAnswers[questionIndex] = optionIndex;
    },
    
    submitQuiz() {
      if (!this.currentQuiz) return;
      
      // Подсчет времени
      this.totalTime = Math.round((Date.now() - this.startTime) / 1000);
      
      // Подсчет правильных ответов
      this.score = 0;
      this.currentQuiz.questions.forEach((question, index) => {
        if (this.userAnswers[index] === question.correctAnswer) {
          this.score++;
        }
      });
      
      this.showResults = true;
      
      // Прокрутка к результатам
      this.$nextTick(() => {
        document.getElementById('result-container')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      });
    },
    
    resetQuiz() {
      this.currentTopic = null;
      this.currentQuiz = null;
      this.userAnswers = {};
      this.showResults = false;
      this.score = 0;
      this.startTime = null;
      this.totalTime = 0;
      this.showExplanations = false;
    },
    
    isCorrect(questionIndex) {
      return this.userAnswers[questionIndex] === this.currentQuiz.questions[questionIndex].correctAnswer;
    },
    
    getPercentage() {
      if (!this.currentQuiz) return 0;
      return Math.round((this.score / this.currentQuiz.questions.length) * 100);
    },
    
    canSubmit() {
      if (!this.currentQuiz) return false;
      return Object.keys(this.userAnswers).length === this.currentQuiz.questions.length;
    },
    
    getScoreStatus() {
      const percentage = this.getPercentage();
      if (percentage === 100) return { text: '🏆 Отлично!', color: 'color: var(--color-success);' };
      if (percentage >= 80) return { text: '✅ Хорошо!', color: 'color: var(--color-success);' };
      if (percentage >= 60) return { text: '⚠️ Пересмотри материал', color: 'color: var(--color-warning);' };
      return { text: '❌ Нужно повторить', color: 'color: var(--color-error);' };
    },
    
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}м ${secs}с`;
    },
    
    getQuestionStatus(questionIndex) {
      if (!(questionIndex in this.userAnswers)) return '○ Не отвечено';
      if (this.isCorrect(questionIndex)) return '✓ Верно';
      return '✗ Неверно';
    },
    
    getDifficulty() {
      if (!this.currentQuiz) return '';
      return this.currentQuiz.difficulty || 'Базовый';
    },
    
    toggleExplanations() {
      this.showExplanations = !this.showExplanations;
    }
  }));
});
