const API_KEY ='635780a1438bbf2f2a05e6f8d0f30f96',
BASE_LINK = 'https://api.openweathermap.org/data/2.5/weather?';

export async function getCurrentWeather(city) {
     try{
    const response = await fetch(`${BASE_LINK}q=${city}&appid=${API_KEY}`);
    if(!response.ok){
        throw new Error('Faild to fetching resources');
        
    }
    const data = await response.json();
    return data;
}
    catch(error){
        console.log(error.message);
            if(error.message.toLowerCase().includes('failed to fetch'))
            alert('Erorr In The Internet, Please Try Again');        
    }
    

}

//Forecast get data function

   export async function getForecast(city) {
        try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
        if(!response.ok){
            throw new Error(' faild feching forecast resoources!');
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log(error.message);
            if(error.message.toLowerCase().includes('failed to fetch'))
            alert('Erorr In The Internet, Please Try Again');
    }
    }