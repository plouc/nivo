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
const { Calendar } = require('@nivo/calendar')
const { dimensions } = require('./commons/dimensions')

module.exports = {
    component: Calendar,
    schema: Joi.object().keys(
        Object.assign({}, dimensions, {
            from: Joi.string().required(),
            to: Joi.string().required(),
            data: Joi.array().min(1).required(),
            colors: Joi.string(),
            direction: Joi.any().valid(['horizontal', 'vertical']),
            yearSpacing: Joi.number(),
            yearLegendOffset: Joi.number(),
            daySpacing: Joi.number(),
            dayBorderWidth: Joi.number(),
            dayBorderColor: Joi.string(),
            monthBorderWidth: Joi.number(),
            monthBorderColor: Joi.string(),
            monthLegendOffset: Joi.number(),
        })
    ),
    runtimeProps: ['width', 'height', 'colors', 'direction'],
    defaults: {
        animate: false,
        margin: { top: 40, right: 50, bottom: 40, left: 50 },
    },
}
