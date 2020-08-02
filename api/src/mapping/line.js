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
const { Line } = require('@nivo/line')
const { curvePropKeys } = require('@nivo/core')
const { scale } = require('./commons/scales')
const { ordinalColors, inheritedColor } = require('./commons/colors')
const { dimensions } = require('./commons/dimensions')
const common = require('./common')

module.exports = {
    component: Line,
    schema: Joi.object().keys(
        Object.assign({}, dimensions, common.axes, {
            data: Joi.array()
                .items(
                    Joi.object()
                        .keys({
                            id: Joi.string().required(),
                            data: Joi.array()
                                .items(
                                    Joi.object()
                                        .keys({
                                            x: Joi.alternatives()
                                                .try(Joi.string(), Joi.number())
                                                .required(),
                                            y: Joi.alternatives()
                                                .try(Joi.string(), Joi.number())
                                                .required(),
                                        })
                                        .unknown()
                                )
                                .min(2)
                                .required(),
                        })
                        .unknown()
                )
                .min(1)
                .required(),

            xScale: scale,
            yScale: scale,

            curve: Joi.any().valid(curvePropKeys),

            enableGridX: Joi.boolean(),
            enableGridY: Joi.boolean(),

            lineWidth: Joi.number().min(0),

            enablePoints: Joi.boolean(),
            pointSize: Joi.number().min(0),
            pointColor: inheritedColor,
            pointBorderWidth: Joi.number().min(0),
            pointBorderColor: inheritedColor,
            enablePointLabel: Joi.boolean(),
            pointLabel: Joi.string(),
            pointLabelYOffset: Joi.number(),

            enableArea: Joi.boolean(),
            areaBlendMode: common.blendMode,
            areaBaselineValue: Joi.alternatives().try(Joi.string(), Joi.number()),
            areaOpacity: Joi.number(),

            markers: Joi.array().items(
                Joi.object().keys({
                    axis: Joi.any().valid(['x', 'y']).required(),
                    value: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
                    style: Joi.object(),
                })
            ),

            colors: ordinalColors,
            colorBy: Joi.string(),
        })
    ),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 40, right: 50, bottom: 40, left: 50 },
    },
}
