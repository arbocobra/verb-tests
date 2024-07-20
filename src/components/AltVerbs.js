import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { startTest } from '../app/verbsSlice';

// import Selection from './Selection';
// import Test from './Test';

import Selection from './AltSelection';
import AltQuestionBox from './AltQuestionBox';

const AltVerbs = () => {

   const [displayQuestion, setDisplayQuestion] = useState(false)

   const isFirstRender = useRef(true)
   // const onFirstRender = () => isFirstRender.current = false
   // const onFirstRender = () => console.log('first render: AltVerbs')
   
   // useEffect(() => onFirstRender(), []);

   const updatePage = () => {
      document.getElementById('selection').classList.add('hidden')
      setDisplayQuestion(true)
   }

   return (
      <div id='verbs'>
         {/* { displayQuestion ? <Test displayQuestion={displayQuestion} /> : <Selection updatePage={updatePage} /> }         */}
         { displayQuestion ? <AltQuestionBox setDisplayQuestion={setDisplayQuestion} /> : <Selection updatePage={updatePage} /> } 
      </div>
   )
}

export default AltVerbs