const cityFormEl = document.querySelector('#city-form');
const cityButtonsEl = document.querySelector('#city-buttons');
const cityInputEl = document.querySelector('#cityname');
const cityContainerEl = document.querySelector('#weather-container');
const citySearchTerm = document.querySelector('#city-search-term');

const formSubmitHandler = function (event) {
  event.preventDefault();

  const cityname = cityInputEl.value.trim();

  if (cityname) {
    getUserCity(cityname);

    cityContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a location.');
  }
};

const buttonClickHandler = function (event) {
  const city = event.target.getAttribute('data-city');

  if (city) {
    getUserCity(city);

    cityContainerEl.textContent = '';
  }
};

const getUserCity = function (user) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${user}&appid=b2e4f3de9c07742c01746aa2ea930dca`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayCity(data, user);
        });
      } else {
        alert(`Error:${response.statusText}`);
      }
    })
    .catch(function (error) {
      alert('Unable to collect weather data');
    });
};

const getFeaturedCity = function (city) {
  const apiUrl = `https://openweathermap.org/find?q=${city}`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, city);
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  });
};
    
const displayCity = function(city, searchTerm) {
    
    cityContainerEl.innerHTML = '';
  
    citySearchTerm.textContent = searchTerm;
  
    // Check if city data is available
    if (city.list.length === 0) {
      cityContainerEl.textContent = 'No weather data found for this city.';
      return;
    }
  
    for (let i = 0; i < 5; i++) {
      const dayData = city.list[i * 8]; // I searched for this formula
  
      // Calculate the date for the current day
      const date = new Date();
      date.setDate(date.getDate() + i); // Needed to fix a recurring error
      
      // Convert temperature from Kelvin to Fahrenheit because open weather map's default is  in K
      const temperatureFahrenheit = (dayData.main.temp - 273.15) * 9/5 + 32;
  
      // Create elements for each day's weather data
      const dayEl = document.createElement('div');
      dayEl.classList.add('weather-day');
  
      const dateEl = document.createElement('h3');
      dateEl.textContent = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  
      const temperatureEl = document.createElement('p');
      temperatureEl.textContent = `Temperature: ${temperatureFahrenheit.toFixed(1)}°F`; 
  
      const descriptionEl = document.createElement('p');
      descriptionEl.textContent = `Description: ${dayData.weather[0].description}`;
  
      dayEl.appendChild(dateEl);
      dayEl.appendChild(temperatureEl);
      dayEl.appendChild(descriptionEl);
  
      cityContainerEl.appendChild(dayEl);
    }
  };
  

cityFormEl.addEventListener('submit', formSubmitHandler);
cityButtonsEl.addEventListener('click', buttonClickHandler);