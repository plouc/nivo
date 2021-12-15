import { FunctionComponent } from 'react'
import Joi from 'joi'
import { Dimensions } from '@nivo/core'
import { HeatMap, HeatMapSvgProps } from '@nivo/heatmap'
import { custom } from './common'
import { dimensions } from './commons/dimensions'
import { inheritedColor } from './commons/colors'
import { axes } from './common'
import { OmitStrict } from '../types'

export type HeatMapApiProps = OmitStrict<
    HeatMapSvgProps & Dimensions,
    | 'isInteractive'
    | 'onClick'
    | 'hoverTarget'
    | 'cellHoverOpacity'
    | 'cellHoverOthersOpacity'
    | 'animate'
>

export const heatmapMapping = {
    component: HeatMap as unknown as FunctionComponent<HeatMapApiProps>,
    schema: Joi.object<HeatMapApiProps>().keys({
        data: custom.array().min(1).required(),
        indexBy: Joi.string(),
        keys: Joi.array().sparse(false).min(1).unique(),
        minValue: Joi.alternatives().try(Joi.any().valid('auto'), Joi.number()).required(),
        maxValue: Joi.alternatives().try(Joi.any().valid('auto'), Joi.number()).required(),
        forceSquare: Joi.boolean(),
        sizeVariation: Joi.number().min(0).max(1),
        padding: Joi.number().min(0),
        width: dimensions.width,
        height: dimensions.height,
        margin: dimensions.margin,

        cellShape: Joi.any().valid('rect', 'circle'),
        colors: Joi.string(),
        cellOpacity: Joi.number().min(0).max(1),
        cellBorderWidth: Joi.number().min(0),
        cellBorderColor: inheritedColor,

        enableLabels: Joi.boolean(),
        labelTextColor: inheritedColor,

        enableGridX: Joi.boolean(),
        enableGridY: Joi.boolean(),
        axisTop: axes.axisTop,
        axisRight: axes.axisRight,
        axisBottom: axes.axisBottom,
        axisLeft: axes.axisLeft,
    }),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 60, right: 0, bottom: 0, left: 60 },
    },
}
