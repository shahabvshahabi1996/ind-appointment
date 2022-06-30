// https://oap.ind.nl/oap/api/desks/AM/slots/?productKey=DOC&persons=1
const fetch = require("node-fetch");
const baudio = require('baudio');
const { exec } = require("child_process");
const player = baudio('./yes.mp3');

const selectedDate = new Date('2022-06-10');

// console.log(selectedDate);

setInterval(() => {
    console.log('CALLED!');
    fetch('https://oap.ind.nl/oap/api/desks/AM/slots/?productKey=DOC&persons=1')
    .then((res) => res.text())
    .then((res) => {
        return res.replace(")]}',", '');
    })
    .then((res) => {
        return Object.keys(JSON.parse(res).data.reduce((prev, current) => {
            return {
                ...prev,
                [current.date]: 1
            }
        }, {}))
        .map((item) => new Date(item));
    })
    .then((res) => { 
        if (res[0] < selectedDate) {
           exec('play ./yes.mp3');
        } else {
            console.log('no :(');
        }
    });
}, 10000)