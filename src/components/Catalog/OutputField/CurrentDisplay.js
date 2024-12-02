import React, {useState} from 'react'
import './CurrentDisplay.css'

const CurrentDisplay = (props) => {

  const [cityData] = useState(props.cityData)
  return (
    <div className='current-city-display animate-slide-in'> 
      <h1>{cityData?.name}</h1>
      <h2>{cityData?.main?.temp} F°</h2>
      <p>Feels Like: {cityData?.main?.feels_like} F°</p>
      <p>High Today: {cityData?.main?.temp_max} F°</p>
      <p>Low Today: {cityData?.main?.temp_min} F°</p>
      <p>Wind Speeds:  {cityData?.wind?.speed} MPH</p>
    </div>
  )
}

export default CurrentDisplay