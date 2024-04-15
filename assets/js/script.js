function GetInfo() {
  var newName = document.getElementById("cityInput").value;
  var cityName = document.getElementById("cityName");
  cityName.innerHTML = "Today in " + newName;

  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName + '&appid=b2e4f3de9c07742c01746aa2ea930dca')
    .then(response => response.json())
    .then(data => {
      // Store data in local storage
      localStorage.setItem('weatherData', JSON.stringify(data));

      //Getting the min and max values for each day
      for (i = 0; i < 6; i++) {
        document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number((data.list[i].main.temp_min - 273.15) * 9 / 5 + 32).toFixed(1) + "°F";
        document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number((data.list[i].main.temp_max - 273.15) * 9 / 5 + 32).toFixed(1) + "°F";
        document.getElementById("day" + (i + 1) + "Desc").innerHTML = data.list[i].weather[0].description;
      }
/*
       // Create a button element
       let button = document.createElement("button");
       button.classList.add("historyBtn");
       button.textContent = cityName;
       button.setAttribute("data-day", i + 1);

       // Add click event listener to the button
       button.addEventListener("click", function() {
         // Perform an action when the button is clicked
         var day = this.getAttribute("data-day");
         console.log(cityName);
       });

       // Append the button to the "history" div
       document.getElementById("history").appendChild(button);
      */

      //Getting Weather Icons
      for (i = 0; i < 6; i++) {
        document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          ".png";
      }

      console.log(data)

    })
    .catch(err => alert("Failed To Load"))

  document.getElementById("weatherContainer").style.display = "block";
}

//Info for the next five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

// Get the right day
function CheckDay(day){
  if(day + d.getDay() > 6){
      return day + d.getDay() - 7;
  }
  else{
      return day + d.getDay();
  }
}

for(i = 0; i<6; i++){
    document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
}

document.getElementById("cityInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") { // Check if the pressed key is 'Enter'
    event.preventDefault(); // Prevent the default action of 'Enter', which is submitting the form
    document.getElementById("submitButton").click(); // Trigger the click event of the button with id 'submitButton'
  }
});
