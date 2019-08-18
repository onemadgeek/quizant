import React from "react";
import PropTypes from "prop-types";

function resultMessage(quizResult, totalQuiz){
	const percentage = quizResult / totalQuiz;
	let message;
	if (percentage === 1) {
		message = 'Great job!'
	} else if (percentage >= .75) {
		message = 'You did alright.'
	} else if (percentage >= .5) {
		message = 'Better luck next time.'
	} else {
		message = 'Maybe you should try a little harder.'
	}
	return message;
}

function Result(props) {
	const {quizResult, totalQuiz, reset } = props;
  return (
    <div className="container result">
      <div>
			<p id="quiz-results-message">{resultMessage(quizResult, totalQuiz)}</p>
			<p id="quiz-results-score">You got <b>{quizResult}/{totalQuiz}</b> questions correct.</p>
			<button id="quiz-retry-button" onClick={reset}><span className="reloadSingle"></span>Play again</button>
      </div>
    </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result;
