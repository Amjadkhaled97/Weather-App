

function Forecast({forecast,isLoading}){

    const dailyForecast = forecast?.list?.filter((_,index) => index%8===0);
    {/*LOADING ANIMATION (SKELETON) */}
    if(isLoading)
        return(<div className="forecast-skeleton">
            {[...Array(5)].map(
                (_,i)=><div key={i} className="skeleton-card"></div>)}
        </div>);  
    if(!forecast) return null;


     
     return(<div className="forecast">
        <hr />
        <h1>Weather Forecast For The Next Five Days</h1>
        <div id="days-container">
        {dailyForecast?.map((day,index) =>(
            <div key={index} className="days-cards">
                <img src={`https://openweathermap.org/img/wn/${day?.weather[0]?.icon}@4x.png`} alt="error" />
                <p>{new Date(day?.dt * 1000).toLocaleDateString('en-UK')}</p>
                <p>{Math.round(day?.main.temp-273.13)}°C</p>
                <p>{day?.weather[0].description}</p>
            </div>
        ))}
        </div>
    </div>
    );
}

export default Forecast