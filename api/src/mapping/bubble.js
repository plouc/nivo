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
const { Bubble } = require('@nivo/circle-packing')
const { dimensions } = require('./commons/dimensions')
const { inheritedColor, ordinalColors } = require('./commons/colors')

module.exports = {
    component: Bubble,
    schema: Joi.object().keys(
        Object.assign({}, dimensions, {
            root: Joi.object().required(),
            identity: Joi.string().required(),
            value: Joi.string().required(),
            padding: Joi.number(),
            leavesOnly: Joi.boolean(),
            borderWidth: Joi.number(),
            borderColor: inheritedColor,
            enableLabel: Joi.boolean(),
            label: Joi.string(),
            labelFormat: Joi.string(),
            labelTextColor: inheritedColor,
            labelTextDY: Joi.number(),
            labelSkipRadius: Joi.number(),

            colors: ordinalColors,
            colorBy: Joi.string(),
        })
    ),
    defaults: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
}
