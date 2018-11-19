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
const { Sankey, sankeyAlignmentPropKeys } = require('@nivo/sankey')
const common = require('./common')

module.exports = {
    component: Sankey,
    schema: Joi.object().keys(
        Object.assign({}, common.dimensions, {
            data: Joi.object()
                .keys({
                    nodes: Joi.array()
                        .items(
                            Joi.object()
                                .keys({
                                    id: Joi.alternatives().try(Joi.string(), Joi.number()),
                                })
                                .unknown()
                        )
                        .required(),
                    links: Joi.array()
                        .items(
                            Joi.object()
                                .keys({
                                    source: Joi.alternatives().try(Joi.string(), Joi.number()),
                                    target: Joi.alternatives().try(Joi.string(), Joi.number()),
                                    value: Joi.number()
                                        .min(0)
                                        .required(),
                                })
                                .unknown()
                        )
                        .required(),
                })
                .required(),

            align: Joi.any().valid(sankeyAlignmentPropKeys),

            // nodes
            nodeOpacity: Joi.number()
                .min(0)
                .max(1),
            nodeWidth: Joi.number().min(1),
            nodePaddingX: Joi.number().positive(),
            nodePaddingY: Joi.number().positive(),
            nodeBorderWidth: Joi.number().min(0),
            nodeBorderColor: Joi.string(),

            // links
            linkOpacity: Joi.number()
                .min(0)
                .max(1),
            linkContract: Joi.number(),
            linkBlendMode: common.blendMode,
            enableLinkGradient: Joi.boolean(),

            // labels
            enableLabels: Joi.boolean(),
            labelPosition: Joi.any().valid(['inside', 'outside']),
            labelPadding: Joi.number(),
            labelOrientation: Joi.any().valid(['horizontal', 'vertical']),
            labelTextColor: Joi.string(),

            // theming
            colors: Joi.string(),
            colorBy: Joi.string(),
        })
    ),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        linkBlendMode: 'normal',
    },
}
