/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

const _ = require('lodash')
const Joi = require('joi')

module.exports = (schema, options = {}) => {
    const { omit } = options

    return (req, res, next) => {
        let data = req.body
        if (omit) {
            data = _.omit(data, omit)
        }

        Joi.validate(data, schema, { abortEarly: false }, (err, value) => {
            if (err) {
                return res.status(400).json({
                    errors: err.details.map(({ message, path }) => {
                        return `${message}${path ? ` (${path})` : ''}`
                    }),
                })
            }

            req.payload = value
            next()
        })
    }
}
