const chakram = require('chakram');

const { expect } = chakram;

require('dotenv').config()

require('it-each')();
require('it-each')({ testPerIteration: true });

describe('Test Suite', () => {

    it('Test Case', () => chakram.get(`${process.env.URL}/${process.env.KEY}/conditions/q/CA/San_Francisco.json`)
        .then(response => {
            expect(response).to.have.status(200);
        })
    )
});