const request = require('request');

const weather = (latitude=22.724699, longitude=75.86646, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=54d470d57b0dcbac2468d5a7e9000ba3&query=${latitude},${longitude}&units=m`;

    request({url,json:true}, (error, {body}={}) => {

        if(error)
        {
            const errorMessage = "Please connect to internet";
            callback(errorMessage, undefined);
        }
        else if(body.error)
        {
            const errorMessage = "Please provide proper coordinate";
            callback(errorMessage, undefined);
        }
        else
        {
            //console.log(body);
            // let forcast = `${body.location.name}, ${body.location.region}, ${body.location.country}`
            let location = `${body.location.name}, ${body.location.region}, ${body.location.country}`
            let forecast = `${body.current.weather_descriptions[0]}. It is ${body.current.temperature} degrees out there and feels like ${body.current.feelslike} degree`;
            callback(undefined,{location, forecast});
        }
    })
};

module.exports = weather;
//22.724699 75.86646