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
const common = require('./common')

module.exports = {
    component: Radar,
    schema: Joi.object().keys(
        Object.assign({}, common.dimensions, {
            // data
            data: Joi.array()
                .min(1)
                .required(),
            keys: Joi.array()
                .sparse(false)
                .min(1)
                .unique()
                .required(),
            indexBy: Joi.string().required(),

            curve: Joi.string(),

            borderWidth: Joi.number().min(0),
            borderColor: Joi.string(),

            gridLevels: Joi.number()
                .integer()
                .positive(),
            gridShape: Joi.any().valid(['linear', 'circular']),
            gridLabelOffset: Joi.number(),

            // labels
            enableLabels: Joi.boolean(),
            labelsTextColor: Joi.string(),
            labelsLinkColor: Joi.string(),

            // dots
            enableDots: Joi.boolean(),
            dotSize: Joi.number().min(0),
            dotColor: Joi.string(),
            dotBorderWidth: Joi.number().min(0),
            dotBorderColor: Joi.string(),
            enableDotLabel: Joi.boolean(),
            dotLabel: Joi.string(),
            dotLabelYOffset: Joi.number(),

            // theming
            colors: Joi.string(),
            colorBy: Joi.string(),
            fillOpacity: Joi.number()
                .min(0)
                .max(1),
        })
    ),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 40, right: 40, bottom: 40, left: 40 },
    },
}
