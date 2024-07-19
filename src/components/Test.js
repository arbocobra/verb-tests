import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredVerbs, selectShuffledIds } from './../app/verbsSlice'
import QuestionBox from './QuestionBox';
import AltQuestionBox from './AltQuestionBox';

import _ from 'lodash'

const Test = (props) => {
   const { displayQuestion } = props
   const filteredVerbs = useSelector(selectFilteredVerbs)
   const questionIdArray = useSelector(selectShuffledIds)

   const isFirstRender = useRef(true)
   // const onFirstRender = () => isFirstRender.current = false
   const onFirstRender = () => console.log('first render: Terbs')

   
 
   useEffect(() => onFirstRender(), []);

   return (
      <div id='test' className='test-container'>
         <QuestionBox 
         questionIdArray={questionIdArray} 
         filteredVerbs={filteredVerbs} 
         displayQuestion={displayQuestion} />
         {/* <AltQuestionBox 
            questionIdArray={questionIdArray} 
            filteredVerbs={filteredVerbs} 
            displayQuestion={displayQuestion} /> */}
      </div>
   )
}

export default Test