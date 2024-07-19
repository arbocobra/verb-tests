import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectShuffledIds, selectNextQuestion, setQuestion, addCorrect, addIncorrect, selectResultTally, selectFinalResults } from '../app/verbsSlice';

import Question from './Question';
import AltQuestion from './AltQuestion';
import Results from './Results';
import Footer from './Footer';

import _ from 'lodash'

const AltQuestionBox = (props) => {
   const { setDisplayQuestion } = props

   const [activeIndex, setActiveIndex] = useState(0)
   const [testActive, setTestActive] = useState(true)
   const finalQuestion = useRef(false)

   const dispatch = useDispatch()

   const currentQuestion = useSelector(selectNextQuestion)
   const questionIdArray = useSelector(selectShuffledIds)

   useEffect(() => {
      if (activeIndex === questionIdArray.length - 1) finalQuestion.current = true
   }, [activeIndex])


   const handleAnswer = (bool, id) => {
      if (bool) dispatch(addCorrect())   
      else dispatch(addIncorrect())

      dispatch(setQuestion(questionIdArray[activeIndex + 1]))
      
      if (finalQuestion.current) completeTest()
      else setActiveIndex((current) => current + 1)
   }

   const completeTest = (event) => {
      setTestActive(false)
      finalQuestion.current = false

   }

   if (testActive) {
      return (
      <div id='test' className='test-container'>
         <div id='question-box'>
            <AltQuestion verb={currentQuestion} index={activeIndex} display={true} handleAnswer={handleAnswer} key={activeIndex} />
         </div> 
         <Footer activeId={activeIndex} testLength={questionIdArray.length} completeTest={completeTest} />
      </div>
   )} else {
      return <Results totalQuestions={activeIndex} setDisplayQuestion={setDisplayQuestion} setTestActive={setTestActive} />
   }
   // return (
   //    <div id='test' className='test-container'>
   //       {/* { if (testActive) (
   //          <div id='question-box'>
   //             <AltQuestion verb={currentQuestion} index={activeIndex} display={true} handleAnswer={handleAnswer} key={activeIndex} />
   //          </div>)
   //       } */}
   //       { testActive ? displayQuestion : displayResults}
   //       <Footer activeId={activeIndex} testLength={questionIdArray.length} completeTest={completeTest} />
   //    </div>
   // )
}

export default AltQuestionBox