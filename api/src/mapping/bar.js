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
const { Bar } = require('@nivo/bar')
const common = require('./common')
const { dimensions } = require('./commons/dimensions')
const { inheritedColor, ordinalColors } = require('./commons/colors')

module.exports = {
    component: Bar,
    schema: Joi.object().keys(
        Object.assign({}, dimensions, common.axes, {
            data: Joi.array().min(1).required(),
            indexBy: Joi.string().required(),
            keys: Joi.array().sparse(false).min(1).unique().required(),

            groupMode: Joi.any().valid(['grouped', 'stacked']),
            layout: Joi.any().valid(['horizontal', 'vertical']),
            reverse: Joi.boolean(),

            minValue: Joi.alternatives().try(Joi.any().valid('auto'), Joi.number()).required(),
            maxValue: Joi.alternatives().try(Joi.any().valid('auto'), Joi.number()).required(),
            padding: Joi.number(),
            innerPadding: Joi.number(),

            borderRadius: Joi.number().min(0),
            borderWidth: Joi.number().min(0),
            borderColor: inheritedColor,

            enableGridX: Joi.boolean(),
            enableGridY: Joi.boolean(),

            enableLabel: Joi.boolean(),
            label: Joi.string(),
            labelSkipWidth: Joi.number(),
            labelSkipHeight: Joi.number(),
            labelLinkColor: Joi.string(),
            labelTextColor: inheritedColor,

            colors: ordinalColors,
            colorBy: Joi.string(),
        })
    ),
    runtimeProps: ['width', 'height', 'colors', 'groupMode'],
    defaults: {
        margin: { top: 40, right: 50, bottom: 40, left: 50 },
    },
}
