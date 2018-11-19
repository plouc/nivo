/*
 * This file is part of the nivo project.
 *
 * (c) 2016-today Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

const Joi = require('joi')

exports.dimensions = {
    width: Joi.number()
        .integer()
        .required(),
    height: Joi.number()
        .integer()
        .required(),
    margin: Joi.object().keys({
        top: Joi.number().integer(),
        right: Joi.number().integer(),
        bottom: Joi.number().integer(),
        left: Joi.number().integer(),
    }),
}

exports.axis = Joi.object()
    .keys({
        orient: Joi.any().valid('top', 'right', 'bottom', 'left'),

        tickSize: Joi.number().min(0),
        tickPadding: Joi.number(),
        tickRotation: Joi.number(),

        legend: Joi.string().empty(''),
        legendPosition: Joi.any().valid('start', 'middle', 'end'),
        legendOffset: Joi.number(),
    })
    .allow(null)

exports.axes = {
    axisTop: exports.axis,
    axisRight: exports.axis,
    axisBottom: exports.axis,
    axisLeft: exports.axis,
}

exports.blendMode = Joi.valid([
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
])

exports.linearScale = Joi.object().keys({
    type: Joi.valid('linear').required(),
    min: Joi.alternatives().try(Joi.valid('auto'), Joi.number()),
    max: Joi.alternatives().try(Joi.valid('auto'), Joi.number()),
    stacked: Joi.boolean(),
})

exports.pointScale = Joi.object().keys({
    type: Joi.valid('point').required(),
})

exports.timeScale = Joi.object().keys({
    type: Joi.valid('time').required(),
    format: Joi.string().required(),
    precision: Joi.string().required(),
})

exports.scale = Joi.alternatives().try(exports.linearScale, exports.pointScale, exports.timeScale)
