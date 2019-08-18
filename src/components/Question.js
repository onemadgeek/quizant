import React from 'react';
import PropTypes from 'prop-types';

function Question(props) {
  return <h2 className="question">{props.content.replace(/&quot;/g,'"').replace(/&#039;/g,"'")}</h2>;
}

Question.propTypes = {
  content: PropTypes.string.isRequired
};

export default Question;
