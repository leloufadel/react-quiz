import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [], 
// 'error', 'ready. 'loading', 'success'
  status: "loading",
}
function reducer(state, action){
 switch(action.type){
  case 'loading':
    return { ...state, status: 'loading'};
 }
}
export default function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
 useEffect(function(){
 fetch("http://localhost:9000/questions")
 .then((res) => res.json())
 .then((data) => console.log(data))
 .then((error) => console.error(error));

 }, [])


  return (
    <div className="app">
      <Header />
    <Main >
    <p>1/15</p>
    <p>questions</p>
    </Main>
    </div>
  );
}


