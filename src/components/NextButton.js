import React from "react";

function NextButton({ dispatch, answer, index, numquestions }) {
  if (answer === null) return null;

  if(index < numquestions - 1) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    );
  }
  if(index === numquestions - 1) 

  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Finish" })}
      >
        finish
      </button>
    </div>
  );
}
export default NextButton;
