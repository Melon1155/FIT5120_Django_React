import NavBar from './NavBar'
import './RoutingMap.css'
import Map from './Map'
import React from 'react'


function RoutingMapPage() {
    return (
        <div id="outro-slider" className="h-screen p-10 bg-gray-50 font-robotoSlab absolute top-0 left-0 z-10 w-full flex flex-col gap-10 tracking-tight">
          <div id="navbar" className = "navbar">
          <NavBar />
          </div>
          <div id="mapbox">
          <Map />
          </div>
        </div>
    ) 
  }

  export default RoutingMapPage