import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { startTest } from '../app/verbsSlice';

import Selection from './Selection';
import Test from './Test';

const Verbs = () => {
   const dispatch = useDispatch();
   // const [selectedTense, setSelectedTense] = useState(['all'])
   // const selectedTenseRef = useRef()
   const [displayQuestion, setDisplayQuestion] = useState(false)

   const isFirstRender = useRef(true)
   // const onFirstRender = () => isFirstRender.current = false
   const onFirstRender = () => console.log('first render: Verbs')
   
   useEffect(() => onFirstRender(), []);

   const updatePage = () => {
      document.getElementById('selection').classList.add('hidden')
      setDisplayQuestion(true)
   }

   // const submitTense = () => {
   //    selectedTenseRef.current = selectedTense
   //    dispatch(startTest(selectedTenseRef.current))
   //    document.getElementById('selection').classList.add('hidden')
   //    setDisplayQuestion(true)
   // }

   return (
      <div id='verbs'>
         {/* Hello there! */}
         {/* <Selection submitTense={submitTense} selectedTense={selectedTense} setSelectedTense={setSelectedTense} /> */}
         <Selection updatePage={updatePage} />
         <Test displayQuestion={displayQuestion}  />
      </div>
   )
}

export default Verbs