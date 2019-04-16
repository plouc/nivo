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
