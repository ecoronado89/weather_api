const chakram = require('chakram');

const { expect } = chakram;

require('dotenv').config()

require('it-each')();
require('it-each')({ testPerIteration: true });

const cheerio = require('cheerio');

describe('California - San Francisco', () => {

    let weatherResponse;
    let feelsLikeResponse;
    let temperatureResponse;
    let apiResponse;

    before(() => {
        return chakram.get('https://weather.com/weather/today/l/USCA0987:1:US')
            .then(reponse => {
                const $ = cheerio.load(reponse.body);
                weatherResponse = $('.today_nowcard-phrase').text();
                temperatureResponse = $('today_nowcard-temp span').text();
                feelsLikeResponse = $('.deg-feels').text();
                return chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/CA/San_Francisco.json`)
            })
            .then(response => {
                apiResponse = response.body.current_observation;
            })
    })

    it('Weather', () => {
        expect(weatherResponse, 'Weather values does not match').to.be.equal(apiResponse.weather);
    }),

    it('Feels Like', () => {
        expect(parseInt(feelsLikeResponse)).to.be.equal(parseInt(apiResponse.feelslike_f))
    }),

    it('Temperature', () => {
        expect(parseInt(temperatureResponse)).to.be.equal(parseInt(apiResponse.temp_f))
    })

});
