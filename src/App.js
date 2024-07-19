// App.js
import React from 'react';
import Verbs from './components/Verbs';
import AltVerbs from './components/AltVerbs';
import './App.css'

const App = () => {

  return (
    <div id='app'>
      {/* <Verbs /> */}
      <AltVerbs/>
    </div>
  );
};

export default App;