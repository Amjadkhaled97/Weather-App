import  Header from './components/Header';
import  Container from './components/Container';
import  SearchBox from './components/SearchBox';
import  Forecast from './components/Forecast';
import './App.css';
import {getCurrentWeather,getForecast} from './services/weatherAPI'
import { useState } from 'react';
function App (){


        const [currentWeather,setWeather] = useState(null);
        const [currentForecast,setForecast] = useState(null);
        const [Loading,setLoading] = useState(false);
        const [error,setError] = useState(null);
        const [hasSearched,setHasSearched] = useState(false)

     const handleSearch = async (city) => {
        if(!city) return;
            try{
                setHasSearched(true)
                setLoading(true);
                setError(null);
                const [weatherData,forecastData] = await Promise.all([
                    getCurrentWeather(city),
                    getForecast(city)
                ]);
                setWeather(weatherData);
                setForecast(forecastData);
            }
            catch(error){
                setError(error.message);
                 

                }
            finally{
                setLoading(false);
                
            }
 }


    return(<div>
        <Header />
        <SearchBox onSearch ={handleSearch}/>  
        {/*LOADING*/}
        { Loading &&<div className='spinner-container'><div id='spinner'></div> </div>}
        {/*NOT FOUND */}
        {!Loading && hasSearched && !currentWeather  &&<p id="not-found-msg">city not found or there error in the internet please try again</p>}
        {/*WELCOME MESSAGE*/}
        {!Loading && !hasSearched &&<h1 className="welcome-msg">Welcome, You Can Search Of Any City</h1> }
        {/*DISPLAY DATA OF WEATHER*/} 
        {!Loading && currentWeather  && <Container weather={currentWeather} /> }
        {/*DISPLAY DATA OF FIVE DAYS FORECAST*/}
         <Forecast forecast ={currentForecast} isLoading = {Loading}/> 
        <footer><hr /> <br />Proded by Amjad Khaled</footer>
        </div>
    )
}

export default App;

