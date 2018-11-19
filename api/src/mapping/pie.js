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
const common = require('./common')

module.exports = {
    component: Pie,
    schema: Joi.object().keys(
        Object.assign({}, common.dimensions, {
            // data
            data: Joi.array()
                .min(1)
                .required(),

            innerRadius: Joi.number().min(0),
            padAngle: Joi.number().min(0),
            cornerRadius: Joi.number().min(0),

            // border
            borderWidth: Joi.number().min(0),
            borderColor: Joi.string(),

            // radial labels
            enableRadialLabels: Joi.boolean(),
            radialLabel: Joi.string(),
            radialLabelsSkipAngle: Joi.number().min(0),
            radialLabelsTextXOffset: Joi.number(),
            radialLabelsTextColor: Joi.string(),
            radialLabelsLinkOffset: Joi.number(),
            radialLabelsLinkDiagonalLength: Joi.number(),
            radialLabelsLinkHorizontalLength: Joi.number(),
            radialLabelsLinkStrokeWidth: Joi.number().min(0),
            radialLabelsLinkColor: Joi.string(),

            // slice labels
            enableSlicesLabels: Joi.boolean(),
            sliceLabel: Joi.string(),
            slicesLabelsSkipAngle: Joi.number().min(0),
            slicesLabelsTextColor: Joi.string(),

            // theming
            colors: Joi.string(),
            colorBy: Joi.string(),
        })
    ),
    runtimeProps: ['width', 'height', 'colors', 'groupMode'],
    defaults: {
        margin: { top: 40, right: 50, bottom: 40, left: 50 },
    },
}
