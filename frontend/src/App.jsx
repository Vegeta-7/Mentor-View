
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mentor from './pages/Mentor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Forms from './Forms/Forms'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/:id' element={<Mentor/>} />
          <Route path='/forms' element={<Forms/>}/>
        </Routes>
      </Router> 
      <ToastContainer />
      {/* <Forms></Forms> */}
    </>
  )
}

export default App
