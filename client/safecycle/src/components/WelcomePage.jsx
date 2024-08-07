import NavBar from './NavBar'
import './WelcomePage.css'
import Map from './Map'
import React, { useRef } from 'react'
import { useLayoutEffect } from 'react'
import gsap from "gsap"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChoroplethMapPage from './ChoroplethMapPage'
import Feature from './Feature'


function WelcomePage() {
    const comp = useRef(null)
    useLayoutEffect(() => {
      let ctx = gsap.context(() => {
        const t1 = gsap.timeline()
        t1.from("#intro-slider", {
          xPercent: "-100",
          duration: 1.3,
          delay: 0.3
        })
        .from(
          ["#title-1", "#title-2", "#title-3"], {
            opacity: 0,
            y: "+=30",
            stagger: 0.5
          }
        ).to(
          ["#title-1", "#title-2", "#title-3"],{
            opacity: 0,
            y: "-=30",
            delay: 0.3,
            stagger: 0.5
          }
        ).from(
          "#outro-slider",{
            opacity: 0,
            y: "-=30",
            duration: 1,
          }
        )
      }, comp)
  
      return () => ctx.revert()
    })
    
    return (
      <div className="relative" ref={comp}>
        <div id="intro-slider" className="h-screen p-10 bg-gray-50 font-robotoSlab absolute top-0 left-0 z-10 w-full flex flex-col gap-10 tracking-tight">
        <h1 className='text-9xl' id="title-1">Choropleth Map</h1>
        <h1 className='text-9xl' id="title-2">Cycling Directions</h1>
        <h1 className='text-9xl' id="title-3">And More...</h1>
        </div>
        <div id="outro-slider" className="h-screen p-10 bg-gray-50 font-robotoSlab absolute top-0 left-0 z-10 w-full flex flex-col gap-10 tracking-tight">
          <div id="navbar" className = "navbar">
            <NavBar />
          </div>
          <div id="feature" className='feature'>
            <Feature />
          </div>
        </div>
        <div className="h-screen flex bg-gray-950 justify-center place-items-center">
          <h1 className='text-9xl font-bold text-gray-100 font-robotoSlab id="welcome"'>Welcome.</h1>
        </div>
      </div>
    ) 
  }

  export default WelcomePage