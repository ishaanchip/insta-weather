import React from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './components/Home/Home'
import Catalog from './components/Catalog/Catalog'
import HandleRefresh from './components/Refresh/HandleRefresh'


const Router = () => {
  return (
    <BrowserRouter>
        <HandleRefresh />
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/weather-finder" element={<Catalog/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Router