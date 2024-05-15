import { toBeDisabled } from '@testing-library/jest-dom/matchers';
import React from 'react'

export default function Options({ question, dispatch, answer}) {

 const hasAnswred = answer !== null;
  return (
    <div className='options'>
      {question.options.map((option, index) => (
        <button key={option} className={`btn btn-option ${index === answer ? "answer" : ""}
        ${
          hasAnswred ? index === question.correctOption ? 'correct': 'wrong' : ''
        }
        `      
      } 
       disabled ={hasAnswred} onClick={() => dispatch({ type: 'newAnswer', payload: index

        })}
        >
            {option}</button>
      ))}
    </div>
  )
}
