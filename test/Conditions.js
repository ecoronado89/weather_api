const chakram = require('chakram');

const { expect } = chakram;

require('dotenv').config();

require('it-each')();
require('it-each')({ testPerIteration: true });

const cheerio = require('cheerio');

const cssSelectors = require('../src/selectors/cssSelectors');

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
        //search state/city based on ENV.VAR

        return chakram.get(process.env.URL)
            .then(reponse => {
                const $ = cheerio.load(reponse.body);
                htmlResponses.weatherResponse = $(cssSelectors.weather).text();
                htmlResponses.temperatureResponse = $(cssSelectors.temperature).text();
                htmlResponses.feelsLikeResponse = $(cssSelectors.feelsLike).text();
                htmlResponses.humidityResponse = $(cssSelectors.humidity).text();
                htmlResponses.dewPointResponse = $ (cssSelectors.dewPoint).text();
                return chakram.get(`${process.env.API}/${process.env.KEY}/conditions/q/CA/San_Francisco.json`);
            })
            .then(response => {
                apiResponse = response.body.current_observation;
            })
    })

    it('Weather', () => {
        expect(htmlResponses.weatherResponse, 'Returned weather values does not match').to.be.equal(apiResponse.weather);
    }),

    it('Feels Like', () => {
        expect(htmlResponses.feelsLikeResponse, 'Returned Feels Like values does not match').to.be.equal(apiResponse.feelslike_f);
    }),

    it('Temperature', () => {
        expect(htmlResponses.temperatureResponse, 'Returned temperature values does not match').to.be.equal(apiResponse.temp_f);
    }),

    it('Humidity', () => {
        expect(htmlResponses.humidityResponse, 'Returned humidity values does not match').to.be.equal(apiResponse.relative_humidity);
    }),

    it('Dew Point', () => {
        expect(htmlResponses.dewPointResponse, 'Returned dew point values does not match').to.be.equal(apiResponse.dewpoint_f);
    })

});