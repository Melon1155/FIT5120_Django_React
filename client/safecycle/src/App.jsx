import './App.css'
import ChoroplethMapPage from './components/ChoroplethMapPage'
import WelcomePage from './components/WelcomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useRef } from "react";
import RoutingMapPage from './components/RoutingMap';


function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/directions" element={<RoutingMapPage />} />
                <Route path="/choropleth" element={<ChoroplethMapPage />} />
            </Routes>
        </Router>
  )
}

export default App
