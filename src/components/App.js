import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";

const initialState = {
  questions: [],
  // 'error', 'ready. 'loading', 'success'
  status: "loading",
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };

    default:
      throw new Error("Action type not recognized");
  }
}
export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState);
  const numquestions = questions.length;
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((error) => dispatch({ type: "error" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numquestions={numquestions} dispatch={dispatch} />
        )}
        {status === "active" && <Questions question={questions[index]}/>}
      </Main>
    </div>
  );
} 