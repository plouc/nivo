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
const { Sunburst } = require('@nivo/sunburst')
const common = require('./common')

module.exports = {
    component: Sunburst,
    schema: Joi.object().keys(
        Object.assign({}, common.dimensions, {
            // data
            data: Joi.object().required(),
            identity: Joi.string().required(),
            value: Joi.string().required(),

            cornerRadius: Joi.number().min(0),
            borderWidth: Joi.number().min(0),
            borderColor: Joi.string(),
            childColor: Joi.string(),

            // theming
            colors: Joi.string(),
            colorBy: Joi.string(),
        })
    ),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
}
