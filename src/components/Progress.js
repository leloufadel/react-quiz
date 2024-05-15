import React from "react";

export default function Progress({ numquestions, index, points, maximumPoints }) {
  return (
    <header className="progress">
      <p>Question <strong>{index + 1 } </strong> / {numquestions}</p>
     <p><strong>{points}</strong> / {maximumPoints}</p>
    </header>
  );
}
