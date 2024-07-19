import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import _ from 'lodash'

const Footer = (props) => {
   const { activeId, testLength, completeTest } = props
   const endTestRef = useRef(null)

   // useEffect(() => {
   //    // let button = document.getElementById('button2')
   //    endTestRef.current.addEventListener('click', completeTest)
   // },[])

   useEffect(() => endTestRef.current.addEventListener('click', completeTest),[])

   return (
      <div id='footer' className='footer-container'>
         <div className='count-box'>
            <p>{`${activeId + 1} / ${testLength}`}</p>
         </div>
         <div className='end-game'>
            <div ref={endTestRef} className='button'>End Game</div>
         </div>
      </div>
   )

}

export default Footer