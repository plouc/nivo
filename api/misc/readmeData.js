/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
