
// http://openweathermap.org/img/wn/${}.png - icon
const apiKey = '54e0df3532424511a971a5aecf3c26c3'
const baseWeatherUrl = 'http://api.openweathermap.org/data/2.5/'
const weatherIconUrl = `http://openweathermap.org/img/wn/`
const baseServerUrl = 'http://localhost:3000'



/**
 * Get today as MM.DD.YYYY formate
 */
 const getDate = () => {
  const date = new Date();
  return `${date.getMonth()}.${date.getDate()}.${date.getFullYear()}`
}

/**
 * Handle click on the button
 */
const handleButtonClick = () => {
  const zipCode = 125480
  const countryCode = 'ru'

  const zipElement = document.querySelector('#zip')

  const feelingElement = document.querySelector('#feelings')

  getWeather(zipCode, countryCode, apiKey)
    .then((weatherData) => {
      data = {
        temperature: weatherData.main.temp,
        weatherIconCode: weatherData.weather[0].icon,
        date: getDate(),
        feeling: feelingElement.value
      }
      postData(data).then(getData())
    })
}

/**
 * Request data from weather api
 * @param {number} zipCode - place's zip code
 * @param {string} countryCode - country code
 * @param {string} apiKey - api key to access api data
 */
const getWeather = async (zipCode, countryCode, apiKey) => {
  try {
    const response = await fetch(`${baseWeatherUrl}weather?zip=${zipCode},${countryCode}&appid=${apiKey}`)

    if (response.ok) {
      const data = await response.json()
      return data
    }

  } catch (error) {
    console.log('getWeather error: ', error)
  }
}

/**
 * POST Request data to the server
 * @param {object} data - data to post on server
 */
const postData = async (data = {}) => {
  try {
    const response = await fetch(`${baseServerUrl}/add_weather`, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (response.status === 201) return

  } catch (error) {
    console.log('postData error: ', error)
  }
}

/**
 * Request data from server
 */
const getData = async () => {
  try {
    const response = await (await fetch(`${baseServerUrl}/get_weather`))

    if (response.status === 200) {
      const data = await response.json()
      console.log('getData', data)
      displayData(data)
    }
  } catch (error) {
    console.log('getData error: ', error)
  }
}

/**
 * Display data on client
 * @param {object} data - data
 */
const displayData = (data = {}) => {
  const dateElement = document.querySelector('#date')
  const tempElement = document.querySelector('#temp')
  const contentElement = document.querySelector('#content')

  dateElement.innerHTML = data.date
  tempElement.innerHTML = data.temperature
  contentElement.innerHTML = data.feeling
}



document.addEventListener('click', handleButtonClick)
