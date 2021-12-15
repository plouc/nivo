'use strict'

const _ = require('lodash')
const mapping = require('../src/mapping')
const samples = require('../src/samples')

const data = {
    endpoints: [],
    samples: [],
}

_.forOwn(mapping, (config, type) => {
    data.endpoints.push(`/charts/${type}`)
})

_.forOwn(samples, (config, id) => {
    data.samples.push(id)
})

console.log(JSON.stringify(data))
