import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCorrect, addIncorrect, selectResultTally, selectFinalResults } from '../app/verbsSlice';

import Question from './Question';
import Footer from './Footer';

import _ from 'lodash'

const QuestionBox = (props) => {
   const {questionIdArray, filteredVerbs, displayQuestion} = props

   // console.log(questionIdArray)

   const [activeIndex, setActiveIndex] = useState(0)
   const [testComplete, setTestComplete] = useState(false)

   const dispatch = useDispatch()

   useEffect(() => console.log('render'))

   // const activeId = questionIdArray[activeIndex]


   // const lastQuestion = useSelector(selectResultTally)
   // const wrongAnswers = useSelector((state) => {
   //    let wrong = state.verbs.questions.incorrectAnswers
   //    let right = state.verbs.questions.correctAnswers
   //    return `Right: ${right} // Wrong: ${wrong}`
   //    // if (testComplete) return selectFinalResults
   //    // else return null
   // })

   const handleAnswer = (bool, id) => {
      if (bool) dispatch(addCorrect(id))   
      else dispatch(addIncorrect(id))

      setActiveIndex((current) => current + 1)
      
      // if (lastQuestion) completeTest()
      // else setActiveId((current) => current + 1)
   }

   const completeTest = (event) => {
      console.log('boop')
      // event.preventDefault()
      // setTestComplete(true)
      // console.log(wrongAnswers)
   }

   const selectedVerb = (activeId) => { 
      return filteredVerbs.find(el => {
         return el.id === activeId
      }) 
   }

   if (displayQuestion && !testComplete) {
      
      return (
         <>
            <div id='question-box'>
               {questionIdArray.map((id, index) => <Question verb={selectedVerb(id)} index={index} display={activeIndex === index} handleAnswer={handleAnswer} key={index} />)}
            </div>
            <Footer activeId={activeIndex} testLength={questionIdArray.length} completeTest={completeTest} />
         </>
      )
   } else return null
}

export default QuestionBox