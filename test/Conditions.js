const chakram = require('chakram');

const { expect } = chakram;

require('dotenv').config()

require('it-each')();
require('it-each')({ testPerIteration: true });

const cheerio = require('cheerio');

describe('California - San Francisco', () => {

    const htmlResponses = {
        weatherResponse: '',
        feelsLikeResponse: '',
        temperatureResponse: '',
        humidityResponse: '',
        preassureResponse: '',
        dewPointResponse: ''
    }
    let apiResponse;

    before(() => {
        return chakram.get('https://weather.com/weather/today/l/USCA0987:1:US')
            .then(reponse => {
                const $ = cheerio.load(reponse.body);
                htmlResponses.weatherResponse = $('.today_nowcard-phrase').text();
                htmlResponses.temperatureResponse = $('.today_nowcard-temp').text();
                htmlResponses.feelsLikeResponse = $('.deg-feels').text();
                htmlResponses.humidityResponse = $('.today_nowcard-sidecar tbody tr:nth-child(2) td > span > span').text();
                htmlResponses.dewPointResponse = $ ('.today_nowcard-sidecar table tr:nth-child(3) td').text();
                return chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/CA/San_Francisco.json`)
            })
            .then(response => {
                apiResponse = response.body.current_observation;
            })
    })

    it('Weather', () => {
        expect(htmlResponses.weatherResponse, 'Returned weather values does not match').to.be.equal(apiResponse.weather);
    }),

    it('Feels Like', () => {
        expect(parseInt(htmlResponses.feelsLikeResponse), 'Returned Feels Like values does not match').to.be.equal(parseInt(apiResponse.feelslike_f))
    }),

    it('Temperature', () => {
        htmlResponses.temperatureResponse = htmlResponses.temperatureResponse.replace('°','');
        expect(htmlResponses.temperatureResponse, 'Returned temperature values does not match').to.be.equal(apiResponse.temp_f)
    }),

    it('Humidity', () => {
        expect(htmlResponses.humidityResponse, 'Returned humidity values does not match').to.be.equal(apiResponse.relative_humidity);
    }),

    it('Dew Point', () => {
        htmlResponses.dewPointResponse = htmlResponses.dewPointResponse.replace('°','');
        expect(parseInt(htmlResponses.dewPointResponse), 'Returned dew point values does not match').to.be.equal(apiResponse.dewpoint_f)
    })

});
