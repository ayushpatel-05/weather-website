// const { response } = require("express");

console.log('Client side javascript file is loaded!');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })




const weeatherForm = document.querySelector('form');
const searchArea = document.querySelector('input');
const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');

weeatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    message1.textContent = 'Loading...';
    message2.textContent = '';
    const address = searchArea.value;

    const url = `http://localhost:3000/weather?address=${address}`;

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                // console.log(data.error);
                message1.textContent = 'Error!!';
                message2.textContent = data.error;
            }
            else
            {
                // console.log(data.location);
                // console.log(data.forecast);
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        })
    })
})