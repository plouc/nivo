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
const { Radar } = require('@nivo/radar')
const { ordinalColors, inheritedColor } = require('./commons/colors')
const { dimensions } = require('./commons/dimensions')

module.exports = {
    component: Radar,
    schema: Joi.object().keys(
        Object.assign({}, dimensions, {
            data: Joi.array().min(1).required(),
            keys: Joi.array().sparse(false).min(1).unique().required(),
            indexBy: Joi.string().required(),
            maxValue: Joi.alternatives().try(Joi.valid('auto'), Joi.number()),

            curve: Joi.string(),

            borderWidth: Joi.number().min(0),
            borderColor: inheritedColor,

            gridLevels: Joi.number().integer().positive(),
            gridShape: Joi.any().valid(['linear', 'circular']),
            gridLabelOffset: Joi.number(),

            enableLabels: Joi.boolean(),
            labelsTextColor: inheritedColor,
            labelsLinkColor: Joi.string(),

            enableDots: Joi.boolean(),
            dotSize: Joi.number().min(0),
            dotColor: inheritedColor,
            dotBorderWidth: Joi.number().min(0),
            dotBorderColor: inheritedColor,
            enableDotLabel: Joi.boolean(),
            dotLabel: Joi.string(),
            dotLabelYOffset: Joi.number(),

            colors: ordinalColors,
            colorBy: Joi.string(),
            fillOpacity: Joi.number().min(0).max(1),
        })
    ),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 40, right: 40, bottom: 40, left: 40 },
    },
}
