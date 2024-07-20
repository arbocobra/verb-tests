import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetTest, selectFinalResults } from '../app/verbsSlice';

const Results = (props) => {
   const { totalQuestions, setDisplayQuestion, setTestActive } = props

   const dispatch = useDispatch()
   const mistakes = useSelector(selectFinalResults)
   const resultsButtonRef = useRef(null)

   useEffect(() => {
      resultsButtonRef.current.addEventListener('click', handleReset)
   }, [])

   const handleReset = () => {
      dispatch(resetTest())
      setDisplayQuestion(false)
      
      setTestActive(false)
   }

   const correctAnswers = totalQuestions - mistakes.length

   return (
      <div id='results-box'>
         <div className='results-container'>
            <div className='results score'>
               <p>Test Score</p>
               <p>Questions Answered: {totalQuestions}</p>
               <p>Correct: {correctAnswers}</p>
               <p>Incorrect: {mistakes.length}</p>

            </div>
            <div className='results errors'>
               Incorrect Conjugations
               <ul>
                  {mistakes.map((verb, i) => (<li key={i}>{verb}</li>))}
               </ul>
            </div>
         </div>
         <div id='footer' className='footer-container'>
            <div className='end-game'>
               <div ref={resultsButtonRef} id='button3' className='button'>Restart</div>
            </div>
         </div>
      </div>
   )

}

export default Results