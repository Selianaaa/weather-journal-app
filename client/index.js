
const apiKey = '54e0df3532424511a971a5aecf3c26c3'
const baseWeatherUrl = 'http://api.openweathermap.org/data/2.5/'
const weatherIconUrl = `http://openweathermap.org/img/wn/`
const baseServerUrl = 'http://localhost:3000'



/**
 * Get today as MM.DD.YYYY formate
 */
 const getDate = () => {
  const date = new Date();
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

/**
 * Handle click on the button
 */
const handleButtonClick = () => {
  const countryCode = 'us'

  const zipElement = document.querySelector('#zip')

  const feelingElement = document.querySelector('#feelings')
  
  if (zipElement.value.length === 0) {
   document.querySelector('#zip').style.backgroundColor = 'rgba(255, 0, 0, 0.45)'
   document.querySelector('.zip_label').style.color = '#aa3131'
   return
  } 

  document.querySelector('#zip').style.backgroundColor = 'rgba( 255, 255, 255, 0.25 )'
  document.querySelector('.zip_label').style.color = 'white'

  getWeather(zipElement.value, countryCode, apiKey)
    .then((weatherData) => {
      data = {
        temperature: weatherData.main.temp,
        date: getDate(),
        city: weatherData.name,
        feeling: feelingElement.value || ''
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
  const response = await fetch(`${baseWeatherUrl}weather?zip=${zipCode},${countryCode}&appid=${apiKey}`)
  
  try { 
    const data = await response.json()
    console.log(data)
    if (data.cod === 200) {
      return data
    } else {

      alert(data.message)
      document.querySelector('#zip').value = ''
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
  const dateElement = document.querySelector('#date span')
  const cityElement = document.querySelector('#city span')
  const tempElement = document.querySelector('#temp span')
  const contentElement = document.querySelector('#content span')

  dateElement.innerHTML = data.date
  cityElement.innerHTML = data.city
  tempElement.innerHTML = `${Math.trunc(data.temperature - 273.15)} °C`
  contentElement.innerHTML = data.feeling
}


document.querySelector('#generate').addEventListener('click', handleButtonClick)
