
import React, {useState, useEffect, useCallback, useRef} from 'react'
import {SunIcon, MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import axios from 'axios'
import {Spinner} from 'react-bootstrap'
import './Catalog.css'
import CurrentDisplay from './OutputField/CurrentDisplay'
import RecDisplay from './OutputField/RecDisplay'


const Catalog = () => {

    //useState of user input & useRef for compare in fetch
    const [userCity, setUserCity] = useState("");
    const userCityRef = useRef(userCity)
    userCityRef.current = userCity;

    //useState of used weather data
    const [currentCityObject, setCurrentCityObject] = useState({});

    //useState of rec cities
    const [recCities, setRecCities] = useState([]);
    
    //isLoading spinner boolean, spinner presever function, and submitting input
    const [isLoading, setIsLoading] = useState(false)
    const delay = (ms) => new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
     
    //pop up related items
    const [displayPopUp, setDisplayPopUp] = useState(false);


    //useRef variables and usage
    const popUpRef = useRef(null);

    //opening pop-up func
    const openPopUp = () =>{
        setDisplayPopUp(true);
        popUpRef.current.showModal();
    }
    //closing pop-up func
    const closePopUp = () =>{
        setDisplayPopUp(false)
        popUpRef.current.close()
    }

    //posting user activity data --> mongodb
    const postCityData = useCallback(async(city) =>{
        try{
            const postData = {city:city}
            await axios.post(`https://insta-weather-api.onrender.com/send-query-data`, postData)

        }
        catch(err){
            console.log(`Error posting city data: ${err}`)
        }
    }, [])


    //function to fetch city weather data
    const fetchCityData = useCallback(async(city) =>{
        try{
            setIsLoading(true);
            await delay(500);
            const res =  await axios.get(`https://insta-weather-api.onrender.com/get-city-data/${city}`)
                //stops loading
                //determines whether data should be transfer to frontend or warning should pop-up
                //will keep original city if res is bad
                console.log(res.data);
                if (res.data === false){
                    openPopUp();
                }
                else{
                    if (userCityRef.current.length > 0){
                        postCityData(city);
                        console.log('post complete')
                    }
                    setUserCity("")
                    setCurrentCityObject(res.data);
                }
        }
        catch(err){
            console.log(`Frontend Error fetching city data: ${err}`)
        }

    }, [postCityData])


    //retrieving mongodb user activity data --> frontend
    const getUserWeather = useCallback(async() =>{
        try{
            const res = await axios.get('https://insta-weather-api.onrender.com/get-user-weather-data')
            setRecCities(res.data)
            console.log('retriving complete: ' + res.data)

        }
        catch(err){
            console.log(`There was an error transfering user data --> client: ${err}`)
        }
    }, [])


    const fetchUI = useCallback(async(city) =>{
        try{
            await fetchCityData(city);
            await delay(100);
            await getUserWeather();
            setIsLoading(false);
        }
        catch(err){
            console.log(`There was an error proccessing the request: ${err}`)
        }
     }, [fetchCityData, getUserWeather])

    
    
    
    //user interaction calls function code
        const handleKeyDown = (e) =>{
            if (e.key === 'Enter'){
                fetchUI(userCity);
            }
        }

        const handleSearchClick = () =>{
            fetchUI(userCity)
        }

        useEffect(() =>{
            fetchUI("boston")
            }, [fetchUI])

        

  

  return (
    <div className='weather-catalog'>

        <div className='search-bar'>
                <SunIcon style={{width:'30px', marginRight:'3%', color:'rgba(214,184,90,0.85)'}}></SunIcon>
                <input value={userCity} onKeyDown={handleKeyDown} onChange={(e)=>{
                    setUserCity(e.target.value)
                }}/>
                <MagnifyingGlassIcon style={{width:'25px'}} onClick={handleSearchClick}></MagnifyingGlassIcon>
        </div>

        <div className='output-field'>
            {isLoading ? 
            <div style={{marginTop:'-20%', textAlign:'center'}}>
            <Spinner animation='border' style={{width:'60px', height:'60px', color:'white', marginBottom:'2%'}} />
            <p style={{color:'white', marginTop:"10%"}}>Stepping outside. We'll let you know how it feels.</p>
            </div>
            :  
            <div className='output-field'>           
                <CurrentDisplay cityData={currentCityObject}/>
                <RecDisplay cityList={recCities} fetchUI={fetchUI}/>
            </div>  
            }

        </div>

        <dialog className={displayPopUp ? 'pop-up pop-up-clicked':'pop-up'} ref={popUpRef} >
            <h3>Oh Shucks!</h3>
            <p>It looks like your searching for a city that we can't access. Be sure to verify spelling & spacing.</p>
            <div className='bottom'>
                <button  onClick={()=>{
                    closePopUp()
                }}>Return to Search</button>
            </div>
       </dialog>



    </div>
  )
}

export default Catalog

