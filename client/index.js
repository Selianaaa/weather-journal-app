
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate)


// Personal API Key for OpenWeatherMap API
const apiKey = '54e0df3532424511a971a5aecf3c26c3'
const baseWeatherUrl = 'http://api.openweathermap.org/data/2.5/'

const baseServerUrl = 'http://localhost:3000'

/* Function called by event listener */
const handleButtonClick = () => {
  const zipElement = document.querySelector('#zip')

  const zipCode = 125480
  const countryCode = 'ru'
  getWeather(baseWeatherUrl, zipCode, countryCode, apiKey).then(
    postData().then(getData())
  )
}

// Event listener to add function to existing HTML DOM element
document.addEventListener('click', handleButtonClick)


/* Function to GET Web API Data*/

const getWeather = async (baseUrl, zipCode, countryCode, apiKey) => {
  try {
    const response = await fetch(`${baseUrl}weather?zip=${zipCode},${countryCode}&appid=${apiKey}`)

    if (response.ok) {
      console.log(response)
    }

  } catch (error) {
    console.log('Error: ', error)
  }
}

/* Function to POST data */
const postData = async () => {
  try {
    const data = await fetch(`${baseServerUrl}/add_weather`, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({a: 'AAA'}),
    })

  } catch (error) {
    console.log('Error: ', error)
  }
}


/* Function to GET Project Data */
/* Function to POST data */
const getData = async () => {
  try {
    const { data } = await (await fetch(`${baseServerUrl}/get_weather`)).json()

    console.log(data)
  } catch (error) {
    console.log('Error: ', error)
  }
}
