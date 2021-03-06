// console.log("Client side javascript file is loaded")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') //mqs eshte id kapet me #
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => { /* e - event */
    e.preventDefault() //Ndalon qe te behet refresh sa here shtypet butoni

    const location = search.value

    messageOne.textContent = 'Loading ... '
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})