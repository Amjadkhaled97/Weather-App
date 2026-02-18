const input = document.getElementById('search-input'),
cityName = document.getElementById('city-name'),
temp = document.getElementById('temp'),
date = document.getElementById('date'),
des = document.getElementById('description')
mainIcon = document.getElementById('main-icon'),
humidity = document.getElementById('humidity'),
wind = document.getElementById('wind'),
mainCard = document.getElementById('main-card'),
spinner = document.getElementById('spinner'),
pressure = document.getElementById('pressure'),
API_KEY ='635780a1438bbf2f2a05e6f8d0f30f96',
BASE_LINK = 'https://api.openweathermap.org/data/2.5/weather?';

window.onload = function(){
    loadCity();
}

async function getWeather(city){
    try{
    const response = await fetch(`${BASE_LINK}q=${city}&appid=${API_KEY}`);
    if(!response.ok){
        throw new Error('Faild to fetching resources');
    } 
    const data = await response.json();
     localStorage.setItem('lastCity',city);

    return data;
}
    catch(error){
        console.log(error.message);

    }
    
}

    async function showWeather(){

        if(mainCard.style.display ='grid') 
            mainCard.style.display = 'none';
        //end of condation

        //SHOW AND HIDE ELEMENTS

        spinner.style.display = 'block';
        const inputValue = input.value;
        const data = await getWeather(inputValue);
        spinner.style.display = 'none';
        input.value = "";
        mainCard.style.display ='grid'; 
        console.log(data);
        cityName.textContent = data.name;

    //DATE CONVERTING

        const time =  new Date(data.dt*1000);
        const options = {year:'numeric',month:'long',day:'numeric'};
        const formattedDT = time.toLocaleDateString('en',options);
        date.textContent = formattedDT;
        temp.textContent = Math.round(data.main.temp-273.15)+" Cْْ";
        des.textContent = data.weather[0].description;

        //CARDS

        humidity.textContent = data.main.humidity+" %";
        pressure.textContent = data.main.pressure+" hPa";
        wind.textContent = data.wind.speed+" m/s";
        mainIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    }


    function loadCity(){
        if(localStorage.getItem('lastCity'))
     input.value = localStorage.getItem('lastCity');
     showWeather();
    }