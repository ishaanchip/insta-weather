
import React from 'react'
import './RecDisplay.css'

const RecDisplay = ({cityList, fetchUI}) => {


  const handleClick = (city) =>{
    fetchUI(city)
  }
  return (
    <div className='full-city-catalog'>
        <h3 style={{textAlign:'center', marginBottom:'5%'}}>Trending Cities</h3>
        <ul>
          {cityList?.length > 0 ? cityList.map((city, i)=> <h4 className='rec-cities' key={`city-${i}`} onClick={()=> handleClick(city)}>{city}</h4>): <></>}
        </ul>
        
    </div>
    
  )
}

export default RecDisplay





