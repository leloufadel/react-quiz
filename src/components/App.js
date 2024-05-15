import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],
  // 'error', 'ready. 'loading', 'success'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
      case "nextQuestion":
        return {
          ...state, 
          index: state.index +1, answer: null,
        }
        case "Finish":
          return {
            ...state,
            status: "finished",
            highscore:
              state.points > state.highscore ? state.points : state.highscore,
          };
          case "restart":
            return { ...initialState, questions:state.questions,  status: "ready" };
    default:
      throw new Error("Action type not recognized");
  }
}
export default function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numquestions = questions.length;
  const maximumPossiblePoints = questions.reduce((acc, pts) => acc + pts.points, 0);

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
        {status === "finished" && (
            <FinishScreen highscore ={highscore} points={points} maximumPossiblePoints= {maximumPossiblePoints} dispatch={dispatch} />
          )}
        {status === "ready" && (
          <StartScreen numquestions={numquestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
          <Progress numquestions={numquestions} index={index} points={points} 
          maximumPoints={maximumPossiblePoints} answer={answer} />
           <Questions
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <NextButton answer={answer} dispatch={dispatch} index={index} numquestions={numquestions} />
          </>
         
        )}
        

      </Main>
    </div>
  );
}
