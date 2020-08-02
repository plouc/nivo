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
const { colorSchemeIds } = require('@nivo/colors')

exports.ordinalColors = Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.object().keys({
        scheme: Joi.valid(...colorSchemeIds).required(),
        size: Joi.number(),
    }),
    Joi.object().keys({
        datum: Joi.string().required(),
    })
)

exports.inheritedColor = Joi.alternatives().try(
    Joi.string(),
    Joi.object().keys({
        theme: Joi.string().required(),
    }),
    Joi.object().keys({
        from: Joi.string().required(),
        modifiers: Joi.array(),
    })
)
