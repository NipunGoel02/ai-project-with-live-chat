import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { div } from 'three/tsl'

import Register from '../screens/Register'
import Home from '../screens/Home'
import Login from '../screens/login'
import Project from '../screens/Project'
function Approute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/project" element={<Project></Project>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Approute