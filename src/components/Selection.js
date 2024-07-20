import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash'
import { startTest } from '../app/verbsSlice';

const Selection = (props) => {
   const {updatePage} = props
   
   const [selectedTense, setSelectedTense] = useState(['all'])
   const [isAll, setIsAll] = useState(true)
   const [submit, setSubmit] = useState(false)

   const isFirstRender = useRef(true)
   const selectButtonRef = useRef(null)
   const tenseSelection = useRef(['present', 'past', 'present continuous', 'past continuous', 'present perfect', 'past perfect', 'future perfect', 'imperfect', 'imperative'])

   const onFirstRender = () => {
      isFirstRender.current = false
   }

   const dispatch = useDispatch()

   useEffect(() => selectButtonRef.current.addEventListener('click', submitTense), []);

   useEffect(() => {
      if (isAll && !isFirstRender.current) {
         let divArr = document.getElementsByClassName('auto-checkbox')
         for (let div of divArr) {
            div.checked = false
         }
      }
   }, [isAll])

   useEffect(() => {
      if (submit && !isFirstRender.current) {
         dispatch(startTest(selectedTense))
         updatePage()
      }
      onFirstRender()
      }, [submit])
   

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
   }

   return (
      <div id='selection' className='selection-container'>
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
            <div ref={selectButtonRef} className='button'>Begin Game</div>
      </div>
   )
}

export default Selection