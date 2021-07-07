
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate)


// Personal API Key for OpenWeatherMap API
const apiKey = '54e0df3532424511a971a5aecf3c26c3'
const baseUrl = 'http://api.openweathermap.org/data/2.5/'

/* Function called by event listener */
const handleButtonClick = () => {
  const zipElement = document.querySelector('#zip')

  const zipCode = 125480
  const countryCode = 'ru'
  getWeather(baseUrl, zipCode, countryCode, apiKey)
}

// Event listener to add function to existing HTML DOM element
document.addEventListener('click', handleButtonClick)


/* Function to GET Web API Data*/

const getWeather = async (baseUrl, zipCode, countryCode, apiKey) => {
  try {
    const { data, ok } = await fetch(`${baseUrl}weather?zip=${zipCode},${countryCode}&appid=${apiKey}`)

    if (ok) {
      console.log(ok, data)
    }

  } catch (error) {
    console.log('Error: ', error)
  }
}

/* Function to POST data */


/* Function to GET Project Data */
