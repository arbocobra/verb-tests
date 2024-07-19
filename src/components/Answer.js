import React, { useEffect } from 'react';

const Answer = (props) => {
   const {verb, index, handleSubmit} = props

   useEffect(() => {
      const div = document.getElementById(`input-${index}`)
      const input = div.querySelector('input')
      input.addEventListener('keyup', pressEnter)
      input.focus()
   }, [])

   const pressEnter = (e) => {
      if (e.key === 'Enter') {
         e.preventDefault();
         handleSubmit(e.target.value)
         clearText(e.target)
       }
   }

   const clearText = (div) => div.value = ''

   if (verb.tense === 'imperative') {
      return (
         <div id={`input-${index}`} className='answer-container'>
            <input className='answer-input' type='text' />
            <div className='pronoun imperative'>{`-${verb.pronounP}`}</div>
         </div>
      )
   } else {
      return (
         <div id={`input-${index}`} className='answer-container'>
            <div className='pronoun'>{verb.pronounP}</div>
            <input className='answer-input' type='text' />
         </div>
      )
   }
}

export default Answer