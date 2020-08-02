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

exports.linearScale = Joi.object().keys({
    type: Joi.valid('linear').required(),
    min: Joi.alternatives().try(Joi.valid('auto'), Joi.number()),
    max: Joi.alternatives().try(Joi.valid('auto'), Joi.number()),
    stacked: Joi.boolean(),
})

exports.pointScale = Joi.object().keys({
    type: Joi.valid('point').required(),
})

exports.timeScale = Joi.object().keys({
    type: Joi.valid('time').required(),
    format: Joi.string().required(),
    precision: Joi.string().required(),
})

exports.scale = Joi.alternatives().try(exports.linearScale, exports.pointScale, exports.timeScale)
