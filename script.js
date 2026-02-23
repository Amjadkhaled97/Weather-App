const input = document.getElementById('search-input'),
cityName = document.getElementById('city-name'),
temp = document.getElementById('temp'),
date = document.getElementById('date'),
des = document.getElementById('description'),
msg = document.getElementById('msg'),
mainIcon = document.getElementById('main-icon'),
humidity = document.getElementById('humidity'),
wind = document.getElementById('wind'),
mainCard = document.getElementById('main-card'),
errorNet = document.getElementById('error-internet'),
spinner = document.getElementById('spinner'),
pressure = document.getElementById('pressure'),
container = document.getElementById('container'),
daysContainer = document.getElementById('days-container'),
section = document.getElementById('section'),
forecastSkeleton = document.getElementById('forecastSkeleton'),
API_KEY ='635780a1438bbf2f2a05e6f8d0f30f96',
BASE_LINK = 'https://api.openweathermap.org/data/2.5/weather?';

/*window.onload = function(){  
 if(localStorage.getItem('lastCity')!=='')
    loadCity();
}*/
    

async function getWeather(city){
    try{
    const response = await fetch(`${BASE_LINK}q=${city}&appid=${API_KEY}`);
    if(!response.ok){
        throw new Error('Faild to fetching resources');
        
    }
    localStorage.setItem('lastCity',city);
    const data = await response.json();
    return data;
}
    catch(error){
        console.log(error.message);  
        alert('Error In The Internet');
        return ;
    }
    
}

    async function showWeather(){
        if(input.value=='') return;
        if(msg) msg.style.display = 'none';
        if(errorNet.style.display='block')
            errorNet.style.display='none';

        if(mainCard.style.display ='grid') 
            mainCard.style.display = 'none';
       
        //end of condation

        //SHOW AND HIDE ELEMENTS

        spinner.style.display = 'block';
        forecastSkeleton.style.display = 'grid';
        const inputValue = input.value.trim();
        const data =  await getWeather(inputValue);
        await showForecast(inputValue);
        spinner.style.display = 'none';

        //Inernet Testing

        if(navigator.onLine){
        mainCard.style.display ='grid'; }
          else{
            offLine();
        }
 
        console.log(data);
        cityName.textContent = data.name;

         
         input.value = "";
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
     input.value = localStorage.getItem('lastCity');
     console.log(localStorage);
     showWeather();
    }

    function onLine(){
        errorNet.style.display = 'none';
    }
    function offLine(){
     errorNet.style.display = 'block';
     mainCard.style.display = 'none';
   
    }

            /* ELEMENTS AND FUNCTIONS TO FORECAST*/


    async function getForecast(city) {
        try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
        if(!response.ok){
            throw new Error(' faild feching forecast resoources!');
        }
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error.message);
    }
    }

     async function showForecast(Value) {
        section.style.display = 'block';
        daysContainer.innerHTML = '';
        forecastSkeleton.style.display = 'grid';
        const data = await getForecast(Value);
         if(!navigator.onLine){
            spinner.style.display = 'none';
            section.style.display = 'none';
            return;
        }
        
        for (let i = 0; i < data.list.length; i+=8) {
            const dayData = data.list[i];

        const dayCard = document.createElement('div');
        const Icon = document.createElement('img');
        const Des = document.createElement('p');
        const Ddate = document.createElement('p');
        const Dtemp = document.createElement('span');

        //FILL INFO IN ITS PLACE

        Icon.src = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;
        Des.textContent = dayData.weather[0].description;
        Dtemp.textContent = Math.round(dayData.main.temp-273.15);
        dayCard.className = 'days-cards';
                //CONVERTING DATE

        const time = new Date(dayData.dt*1000);
        const options = {month:'numeric',day:'numeric'};
         Ddate.textContent = time.toLocaleDateString('en',options);


        //********ADDING CHILDS(GENERATE CARD)********/

            dayCard.appendChild(Icon);
            dayCard.appendChild(Ddate);
            dayCard.appendChild(Dtemp);
            dayCard.appendChild(Des);

            daysContainer.appendChild(dayCard);


        }
          forecastSkeleton.style.display = 'none';
    }

    
