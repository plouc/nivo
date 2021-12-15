import Joi from 'joi'
import { Dimensions } from '@nivo/core'
import { Line, LineSvgProps } from '@nivo/line'
// @ts-ignore
import { curvePropKeys } from '@nivo/core'
import { custom, axes, blendMode } from './common'
import { scale } from './commons/scales'
import { ordinalColors, inheritedColor } from './commons/colors'
import { dimensions } from './commons/dimensions'
import { OmitStrict } from '../lib/types'
import { FunctionComponent } from 'react'

export type LineApiProps = OmitStrict<
    LineSvgProps & Dimensions,
    | 'layers'
    | 'pointSymbol'
    | 'isInteractive'
    | 'useMesh'
    | 'debugMesh'
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'onClick'
    | 'tooltip'
    | 'enableSlices'
    | 'debugSlices'
    | 'sliceTooltip'
    | 'crosshairType'
    | 'animate'
    | 'motionConfig'
>

const lineMapping = {
    component: Line as unknown as FunctionComponent<LineApiProps>,
    schema: Joi.object<LineApiProps>().keys({
        data: custom
            .array()
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

        // xScale: scale,
        xScale: Joi.object(),
        xFormat: Joi.string(),
        // yScale: scale,
        yScale: Joi.object(),
        yFormat: Joi.string(),
        width: dimensions.width,
        height: dimensions.height,
        margin: dimensions.margin,

        curve: Joi.any().valid(...curvePropKeys),
        colors: ordinalColors,
        lineWidth: Joi.number().min(0),
        enableArea: Joi.boolean(),
        areaBaselineValue: Joi.alternatives().try(Joi.string(), Joi.number()),
        areaOpacity: Joi.number(),
        areaBlendMode: blendMode,

        enablePoints: Joi.boolean(),
        pointSize: Joi.number().min(0),
        pointColor: inheritedColor,
        pointBorderWidth: Joi.number().min(0),
        pointBorderColor: inheritedColor,
        enablePointLabel: Joi.boolean(),
        pointLabel: Joi.string(),
        pointLabelYOffset: Joi.number(),

        enableGridX: Joi.boolean(),
        gridXValues: Joi.array(),
        enableGridY: Joi.boolean(),
        gridYValues: Joi.array(),
        axisTop: axes.axisTop,
        axisRight: axes.axisRight,
        axisBottom: axes.axisBottom,
        axisLeft: axes.axisLeft,

        markers: Joi.array().items(
            Joi.object().keys({
                axis: Joi.any().valid('x', 'y').required(),
                value: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
                style: Joi.object(),
            })
        ),
    }),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 40, right: 50, bottom: 40, left: 50 },
    },
}

export default lineMapping
