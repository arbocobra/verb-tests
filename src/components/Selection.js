import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash'

import { startTest, selectFilteredAllVerbs } from '../app/verbsSlice';

// import createVerbObject from '../functions/loadingFunctions';

const Selection = (props) => {
   const {updatePage} = props
   // const {submitTense, selectedTense, setSelectedTense} = props
   const [selectedTense, setSelectedTense] = useState(['all'])
   const [isAll, setIsAll] = useState(true)
   const [submit, setSubmit] = useState(false)

   const dispatch = useDispatch()

   const tenseSelection = useRef(['present', 'past', 'present continuous', 'past continuous', 'present perfect', 'past perfect', 'future perfect', 'imperfect', 'imperative'])

   const isFirstRender = useRef(true)
   const onFirstRender = () => isFirstRender.current = false

   useEffect(() => {
      let button = document.getElementById('button1')
      button.addEventListener('click', submitTense)
   }, []);

   useEffect(() => {
      // if (!isFirstRender.current) {
      //    console.log(isAll)
      //    if (isAll) {
      //       let divArr = document.getElementsByClassName('auto-checkbox')
      //       for (let div of divArr) {
      //          div.checked = false
      //       }
      //    }
      // }
      if (isAll) {
         let divArr = document.getElementsByClassName('auto-checkbox')
         for (let div of divArr) {
            div.checked = false
         }
      }
   }, [isAll])

   useEffect(() => {
      if (submit) dispatch(startTest(selectedTense))
      }, [submit])

   // useEffect(() => {
   //    if (!isFirstRender.current) {
   //       console.log(selectedTense)
   //    }
   // }, [selectedTense])

   

   const checkHandler = (e) => {
      let val = e.target.value
      let isSelected = e.target.checked
      let arr = [...selectedTense]

      if (val === 'all') {
         setIsAll(current => !current)
         if (isSelected) setSelectedTense(['all'])
         else arr = [...arr].filter(el => el !== 'all')         
      } else {
         if (isSelected) {
            arr = [...arr].filter(el => el !== 'all')
            arr.push(val)
            setIsAll(false)
         } else arr = [...arr].filter(el => el !== val)
         setSelectedTense(arr)
      }
   }

   const submitTense = (event) => {
      event.preventDefault()
      setSubmit(true)
      // dispatch(startTest(selectedTense))
      updatePage()
      // document.getElementById('selection').classList.add('hidden')
   }

   return (
      <div id='selection' className='selection-container'>
         {/* <form> */}
            <div className='selection-input' id='input-all'>
               <input type='checkbox' id='tense0' value='all' onChange={checkHandler} checked={isAll} />
               <label htmlFor='tense0'> All</label>
            </div>
            {tenseSelection.current.map((tense, i) => (
               <div id={`input-${_.kebabCase(tense)}`} className='selection-input' key={`checkbox${i}`}>
                  <input className='tense-checkbox, auto-checkbox' type='checkbox' id={`tense${i + 1}`} value={tense} onChange={checkHandler} />
                  <label htmlFor={`tense${i}`}> {_.upperFirst(tense)}</label>
               </div>
            ))}
            <div id='button1' className='button'>Begin Game</div>
            {/* <div><input type='button' value='Ready' onClick={submitTense} /></div> */}
         {/* </form> */}
         {/* {Object.keys(allVerbs).map(el => (<p>{el}</p>))} */}
      </div>
   )
}

export default Selection