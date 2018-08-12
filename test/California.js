const chakram = require('chakram');

const { expect } = chakram;

require('dotenv').config()

require('it-each')();
require('it-each')({ testPerIteration: true });

describe('California - San Francisco', () => {

    it('Weather', () => chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/CA/San_Francisco.json`)
        .then(response => {
            expect(response.body.current_observation.weather).to.be.equal('Clear');
        })
    ),

    it('Temperature Celsious', () => chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/CA/San_Francisco.json`)
        .then(response => {
            expect(response.body.current_observation.temp_c).to.be.equal(29.3);
        })
    ),

    it('Wind KPH', () => chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/CA/San_Francisco.json`)
        .then(response => {
            expect(response.body.current_observation.wind_kph).to.be.equal(3.2);
        })
    ),

    it('Station Id', () => chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/VA/Williamsburg.json`)
        .then(response => {
            expect(response.body.current_observation.station_id).to.be.equal('KVAWILLI11');
        })
    )
});