const chakram = require('chakram');

const { expect } = chakram;

require('dotenv').config()

require('it-each')();
require('it-each')({ testPerIteration: true });

const cheerio = require('cheerio');

describe('10 Day Forecast', () => {
    
let forecast;

    before(() => {
        return chakram.get(`${process.env.API}/${process.env.KEY}/forecast10day/q/CA/San_Francisco.json`)
        .then(response => {
            forecast = response.body.forecast.simpleforecast.forecastday
        })
    })

    for(let i = 0; i < 10; i += 1){
        it(`Temperature comparisson day: ${i}`, () => {
            let diff = Math.abs(forecast[i].low.fahrenheit - forecast[i].high.fahrenheit);
            expect(diff, 'Temperature difference is greater than 20 degress').to.be.below(20);
        })
    }
})