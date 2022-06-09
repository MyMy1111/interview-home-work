import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'

import BlogDetail from './pages/BlogDetail'
import Home from './pages/Home'



const App = () => {
 
  return (
    <div className='container'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<Home />} />
        <Route path='/blog/:id' element={<BlogDetail />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App