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
const { Pie } = require('@nivo/pie')
const { ordinalColors, inheritedColor } = require('./commons/colors')
const { dimensions } = require('./commons/dimensions')

module.exports = {
    component: Pie,
    schema: Joi.object().keys(
        Object.assign({}, dimensions, {
            data: Joi.array().min(1).required(),

            innerRadius: Joi.number().min(0),
            padAngle: Joi.number().min(0),
            cornerRadius: Joi.number().min(0),

            borderWidth: Joi.number().min(0),
            borderColor: inheritedColor,

            enableRadialLabels: Joi.boolean(),
            radialLabel: Joi.string(),
            radialLabelsSkipAngle: Joi.number().min(0),
            radialLabelsTextXOffset: Joi.number(),
            radialLabelsTextColor: inheritedColor,
            radialLabelsLinkOffset: Joi.number(),
            radialLabelsLinkDiagonalLength: Joi.number(),
            radialLabelsLinkHorizontalLength: Joi.number(),
            radialLabelsLinkStrokeWidth: Joi.number().min(0),
            radialLabelsLinkColor: inheritedColor,

            enableSlicesLabels: Joi.boolean(),
            sliceLabel: Joi.string(),
            slicesLabelsSkipAngle: Joi.number().min(0),
            slicesLabelsTextColor: inheritedColor,

            colors: ordinalColors,
            colorBy: Joi.string(),
        })
    ),
    runtimeProps: ['width', 'height', 'colors', 'groupMode'],
    defaults: {
        margin: { top: 40, right: 50, bottom: 40, left: 50 },
    },
}
