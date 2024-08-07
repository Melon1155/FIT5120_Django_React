import NavBar from './NavBar'
import './ChoroplethMapPage.css'
import ChoroplethMap from './ChoroplethMap'
import React from 'react'


function ChoroplethMapPage() {
    return (
        <div id="outro-slider" className="h-screen p-10 bg-gray-50 font-robotoSlab absolute top-0 left-0 z-10 w-full flex flex-col gap-10 tracking-tight">
          <div id="navbar" className = "navbar">
          <NavBar />
          </div>
          <div id="mapbox">
          <ChoroplethMap />
          </div>
        </div>
    ) 
  }

  export default ChoroplethMapPage