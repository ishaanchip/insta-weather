import React, { useEffect } from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './components/Home/Home'
import Catalog from './components/Catalog/Catalog'

const Router = () => {
  useEffect(() => {
    const handleRefresh = () => {
      window.location.href = '/'
    }
    
    window.addEventListener('beforeunload', handleRefresh)
    
    return () => {
      window.removeEventListener('beforeunload', handleRefresh)
    }
  }, [])

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/weather-finder" element={<Catalog/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Router