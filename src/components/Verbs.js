import React, { useState } from 'react';
import Selection from './Selection';
import TestContainer from './TestContainer';

const Verbs = () => {

   const [displayQuestion, setDisplayQuestion] = useState(false)

   const updatePage = () => {
      document.getElementById('selection').classList.add('hidden')
      setDisplayQuestion(true)
   }

   return (
      <div id='verbs'>
         { displayQuestion ? <TestContainer setDisplayQuestion={setDisplayQuestion} /> : <Selection updatePage={updatePage} /> } 
      </div>
   )
}

export default Verbs