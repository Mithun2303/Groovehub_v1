import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddFile } from './AddFile';
function App() {

  return (
    // <div>
    //   Hello World
    // </div>
    <Router>
      <Routes>
        <Route path='/' element={<AddFile/>}/>
      </Routes>
    </Router>
  )
}

export default App
