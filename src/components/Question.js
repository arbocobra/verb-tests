import React, { useState } from 'react';
import Answer from './Answer';
import Hint from './Hint';
import { checkAnswer } from '../functions/questionFunctions';
import checkMark from './../images/check.png'
import xMark from './../images/delete.png'
import exclamationMark from './../images/exclamation.png'

const Question = (props) => {
   const {verb, index, display, handleAnswer} = props
   const [correct, setCorrect] = useState(null)

   const isCorrectText = () => {
      if (correct === null) return null
      else if (correct === 0) return null
      else if (correct === 1) return (
         <div className='result'>
            <p>{`(wrong accent) - ${verb.fullP}`}</p>
         </div>
      )
      else if (correct === 2) return (
         <div className='result'>
            <p>{verb.fullP}</p>
         </div>
      )
   }

   const responseIcon = () => {
      if (correct === null) return null
      else if (correct === 0) return checkMark
      else if (correct === 1) return exclamationMark
      else if (correct === 2) return xMark
   }
   // const responseIcon = setIcon()

   const isCorrectIcon = () => {
      if (correct === null) return null
      else if (correct === 0) return (
         <div className='icon green'><span>&#10004;</span></div>
      )
      else if (correct === 1) return (
         <div className='icon red'><span>&#10071;&#10071;</span></div>
      )
      else if (correct === 2) return (
         <div className='icon red'><span>&#10006;</span></div>
      )
   }

   const handleSubmit = (val) => {
      const result = checkAnswer(val, verb.conjugationP)
      if (result === 0) { // is correct
         setCorrect(result)
         setTimeout(() => handleAnswer(true), 1000)
      } else if (result === 1) { // correct but wrong accent
         setCorrect(result)
         setTimeout(() => handleAnswer(false), 2500)
      } else if (result === 2) { // incorrect
         setCorrect(result)
         setTimeout(() => handleAnswer(false), 2500)
      }
   }

   if (display) {
      return (
         <>
            <div id={`question-${index}`} className='question-container'>
               <div className='question-text'>
                  <p>{verb.fullE}</p>
               </div>
               <Answer verb={verb} index={index} handleSubmit={handleSubmit} responseIcon={responseIcon()} />
               {/* {isCorrectIcon()} */}
               {isCorrectText()}
            </div>
            <Hint verb={verb} index={index} />
         </>
      )
   } else return null
   
}

export default Question