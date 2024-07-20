import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectShuffledIds, selectNextQuestion, setQuestion, addCorrect, addIncorrect } from '../app/verbsSlice';

import Question from './Question';
import Results from './Results';
import Footer from './Footer';


const TestContainer = (props) => {
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


   const handleAnswer = (bool) => {
      if (bool) dispatch(addCorrect())   
      else dispatch(addIncorrect())

      dispatch(setQuestion(questionIdArray[activeIndex + 1]))
      
      if (finalQuestion.current) completeTest()
      else setActiveIndex((current) => current + 1)
   }

   const completeTest = () => {
      setTestActive(false)
      finalQuestion.current = false

   }

   if (testActive) {
      return (
      <div id='test' className='test-container'>
         <div id='question-container' className='question-box'>
            <Question verb={currentQuestion} index={activeIndex} display={true} handleAnswer={handleAnswer} key={activeIndex} />
         </div> 
         <Footer activeId={activeIndex} testLength={questionIdArray.length} completeTest={completeTest} />
      </div>
   )} else {
      return <Results totalQuestions={activeIndex} setDisplayQuestion={setDisplayQuestion} setTestActive={setTestActive} />
   }
}

export default TestContainer