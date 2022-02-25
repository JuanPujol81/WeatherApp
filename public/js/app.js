console.log('This is the JavaScript file running on the server')



const weatherForm = document.querySelector('form')
const searchData = document.querySelector('input')
const forecastField = document.getElementById('forecast-display')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchData.value
    const sarchTerm = '/weather?address=' + location

    fetch(sarchTerm).then(response => {
    response.json().then((data) => {
        if(data.error)
            forecastField.innerText = data.error
        else 
            forecastField.innerText = data.forecast.forecastSentence
        })
    })
})