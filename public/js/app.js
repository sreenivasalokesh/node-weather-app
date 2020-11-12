console.log('client side js loaded')


const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    console.log(search.value)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
             messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.weather
            messageTwo.textContent = data.temperature
        }
    })
})
})