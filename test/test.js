const chakram = require('chakram');

const { expect } = chakram;

require('dotenv').config()

require('it-each')();
require('it-each')({ testPerIteration: true });

describe('Weather API', () => {

    describe('California - San Francisco', () => {
        it('Weather', () => chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/CA/San_Francisco.json`)
            .then(response => {
                expect(response.body.current_observation.weather).to.be.equal('Clear');
            })
        ),

        it('Temperature Celsious', () => chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/CA/San_Francisco.json`)
            .then(response => {
                expect(response.body.current_observation.temp_c).to.be.equal(18.1);
            })
        ),

        it('Temperature Celsious', () => chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/CA/San_Francisco.json`)
            .then(response => {
                 expect(response.body.current_observation.wind_kph).to.be.equal(12.9);
            })
         ),

        it('Wind Direction', () => chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/CA/San_Francisco.json`)
            .then(response => {
                expect(response.body.current_observation.wind_dir).to.be.equal('WSW');
            })
        )
    }),

    describe('Colorado - Aspen', () => {
        it('Weather', () => chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/CO/Aspen.json`)
            .then(response => {
                expect(response.body.current_observation.weather).to.be.equal('Clear');
            })
        ),

        it('Temperature Fahrenheit', () => chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/CO/Aspen.json`)
            .then(response => {
                expect(response.body.current_observation.temp_f).to.be.equal(85);
            })
        ),

        it('Feels Like', () => chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/CO/Aspen.json`)
            .then(response => {
                 expect(response.body.current_observation.feelslike_string).to.be.equal('83 F (28 C)');
            })
         ),

        it('Relative Humidity', () => chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/CO/Aspen.json`)
            .then(response => {
                expect(response.body.current_observation.relative_humidity).to.be.equal('17%');
            })
        )
    })

});