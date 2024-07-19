import React, { useEffect } from 'react';
import { pullHints } from '../functions/questionFunctions';

import _ from 'lodash'

const Hint = (props) => {
   const {verb, index} = props

   useEffect(() => {
      const divArr = document.getElementsByClassName('hint-title')
      for (let div of divArr) {
         let divContents = div.nextElementSibling
         div.addEventListener('click', () => divContents.classList.toggle('hidden'))
      }
   })

   const hintB = () => {
      const hint = pullHints(verb.tense, verb.infinitiveP)
      if (hint) return (
         <p>{hint}</p>
      )
      else return (
         <p className='no-hint'>N/A</p>
      )
   }
   
   return (
      <div id={`hint-${index}`} className='hint-container'>
         <div className='hint'>
            <div className='hint-title'>Hint 1</div>
            <div className='hint-contents hidden'>
               <p>{`${_.upperCase(verb.tense)} // ${_.capitalize(verb.infinitiveP)}`}</p>
            </div>    
         </div>
         <div className='hint'>
            <div className='hint-title'>Hint 2</div>
            <div className='hint-contents hidden'>
               {hintB()}
            </div>    
         </div>
      </div>
   )
}

export default Hint