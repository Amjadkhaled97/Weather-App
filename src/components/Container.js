import Details from "./Details";
function Container({weather}){
    
    return(
        <div id="container">
            
       <div id="main-card">

            <div className="main-info">
        <div className="top-main-info">
            <div className="left-side">
            
                <span id="city-name">{weather?.name}</span>
                <span id="date">{new Date(weather?.dt * 1000).toLocaleDateString('en-UK')}</span>
                <span id="temp">{Math.round(weather?.main.temp-273.13)}</span>

            </div>

            <div className="right-side">
                <div className="img-container">

            <img id="main-icon" src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@4x.png`}alt="no internet" />

                 </div>
            </div>
            </div>
          <div id="description">
            {weather?.weather[0]?.description}
          </div>


          </div>
            <div className="details">

            <Details txt="Humidity" id="humidity" value={weather?.main?.humidity +' %'}/>
            <Details txt="Wind" id="wind" value={weather?.wind?.speed + 'm.s'}/>
            <Details txt="Pressure" id="pressure" value={weather?.main?.pressure+'pa'}/>

            </div>
    
        </div>
        </div>
    );
}
 
export default Container;