/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

const Joi = require('joi')
const { Chord } = require('@nivo/chord')
const common = require('./common')

module.exports = {
    component: Chord,
    schema: Joi.object().keys(
        Object.assign({}, common.dimensions, {
            matrix: Joi.array().required(),
            keys: Joi.array().required(),

            padAngle: Joi.number(),
            innerRadiusRatio: Joi.number()
                .min(0)
                .max(1),
            innerRadiusOffset: Joi.number()
                .min(0)
                .max(1),

            ribbonOpacity: Joi.number()
                .min(0)
                .max(1),
            ribbonBorderWidth: Joi.number().min(0),
            ribbonBorderColor: Joi.string(),

            arcOpacity: Joi.number()
                .min(0)
                .max(1),
            arcBorderWidth: Joi.number().min(0),
            arcBorderColor: Joi.string(),

            // labels
            enableLabel: Joi.boolean(),
            label: Joi.string(),
            labelOffset: Joi.number(),
            labelRotation: Joi.number(),
            labelTextColor: Joi.string(),

            // theming
            colors: Joi.string(),
            colorBy: Joi.string(),
        })
    ),
    runtimeProps: [
        'width',
        'height',
        'padAngle',
        'innerRadiusRatio',
        'innerRadiusOffset',
        'ribbonOpacity',
        'arcOpacity',
        'colors',
    ],
    defaults: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
}
