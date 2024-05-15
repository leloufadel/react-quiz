import React from "react";

export default function Progress({ numquestions, index, points, maximumPoints, answer }) {
  return (
    <header className="progress">
        <progress value={index + Number(answer !== null)} max={numquestions}></progress>
      <p>Question <strong>{index + 1 } </strong> / {numquestions}</p>
     <p><strong>{points}</strong> / {maximumPoints}</p>
    </header>
  );
}
