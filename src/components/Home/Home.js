import React from 'react'
import './Home.css'
import {SunIcon} from '@heroicons/react/20/solid'
import {Link} from 'react-router-dom'
const Home = () => {



  return (
    <div className='home'>
      <div className='home-left-side'>
        <div className='title'>
          <h1>InstaWeather</h1>
          <SunIcon style={{width:'65px'}}></SunIcon>
        </div>
        <p>From San Francisco to Tokyo, we offer real-time weather updates. With our various in-depth metrics, we will give you everything you need to know about the weather before you step outside today.</p>
        <p>- InstaWeather Developers </p>
      </div>
      <div className='home-right-side'>
        <Link to='/weather-finder'><button>Launch Weather Finder</button></Link>
      </div>
    </div>
  )
}

export default Home