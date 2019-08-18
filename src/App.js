import React, { Component } from "react";
// import quizQuestions from './api/quizQuestions';
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import logo from "./img/large_quizant.png";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: "//opentdb.com/api.php?amount=10",
      counter: 0,
      error: null,
      isLoaded: false,
      quizQuestions: [],
      questionId: 1,
      totalQuiz: 0,
      question: "",
      answerOptions: [],
      answer: "",
      answersCount: {},
      correct_answer: "",
      result: ""
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleResetQuiz = this.handleResetQuiz.bind(this);
  }

  componentDidMount() {
    const { apiUrl } = this.state;
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        result => {
          this.init(result.results);
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error || { message: "Please try again.." }
          });
        }
      );
  }

  init(questions) {
    this.setState({
      isLoaded: true,
      quizQuestions: questions,
      totalQuiz: questions.length,
      question: questions[0].question,
      answerOptions: this.shuffleArray([
        questions[0].correct_answer,
        ...questions[0].incorrect_answers
      ]),
      correct_answer: questions[0].correct_answer
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event) {
    const { quizQuestions } = this.state;
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  handleResetQuiz() {
    const { quizQuestions } = this.state;
    this.setState({
      counter: 0,
      error: null,
      questionId: 1,
      answer: "",
      answersCount: {},
      result: "",
      isLoaded: false
    });
    this.init(quizQuestions);
  }

  setUserAnswer(answer) {
    const { correct_answer } = this.state;
    if (answer === correct_answer) {
      this.setState(state => ({
        answersCount: {
          ...state.answersCount,
          [answer]: (state.answersCount[answer] || 0) + 1
        }
      }));
    }
    this.setState({ answer });
  }

  setNextQuestion() {
    const { quizQuestions } = this.state;
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: this.shuffleArray([
        quizQuestions[counter].correct_answer,
        ...quizQuestions[counter].incorrect_answers
      ]),
      correct_answer: quizQuestions[counter].correct_answer,
      answer: ""
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);
    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length) {
      this.setState({ result: String(result.length) });
    } else {
      this.setState({ result: "0" });
    }
  }

  renderQuiz() {
    const { quizQuestions } = this.state;
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    const { totalQuiz, result } = this.state;
    return (
      <Result
        quizResult={result}
        totalQuiz={totalQuiz}
        reset={this.handleResetQuiz}
      />
    );
  }

  render() {
    const { error, isLoaded, result } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="loader" />;
    } else {
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          {result ? this.renderResult() : this.renderQuiz()}
        </div>
      );
    }
  }
}

export default App;
