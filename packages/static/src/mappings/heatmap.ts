import { FunctionComponent } from 'react'
import Joi from 'joi'
import { DefaultHeatMapDatum, HeatMap, HeatMapDatum, HeatMapSvgProps } from '@nivo/heatmap'
import { custom } from './common'
import { dimensions } from './commons/dimensions'
import { inheritedColor } from './commons/colors'
import { axes } from './common'
import { OmitStrict } from '../types'

export type HeatMapApiProps<
    Datum extends HeatMapDatum = DefaultHeatMapDatum,
    ExtraProps extends object = Record<string, never>
> = OmitStrict<
    HeatMapSvgProps<Datum, ExtraProps>,
    'isInteractive' | 'onClick' | 'hoverTarget' | 'activeOpacity' | 'inactiveOpacity' | 'animate'
>

export const heatmapMapping = {
    component: HeatMap as unknown as FunctionComponent<HeatMapApiProps>,
    schema: Joi.object<HeatMapApiProps>().keys({
        data: custom.array().min(1).required(),
        minValue: Joi.alternatives().try(Joi.any().valid('auto'), Joi.number()).required(),
        maxValue: Joi.alternatives().try(Joi.any().valid('auto'), Joi.number()).required(),
        forceSquare: Joi.boolean(),
        sizeVariation: Joi.number().min(0).max(1),
        xOuterPadding: Joi.number().min(0).max(1),
        xInnerPadding: Joi.number().min(0).max(1),
        yOuterPadding: Joi.number().min(0).max(1),
        yInnerPadding: Joi.number().min(0).max(1),
        width: dimensions.width,
        height: dimensions.height,
        margin: dimensions.margin,

        cellComponent: Joi.any().valid('rect', 'circle'),
        colors: Joi.object(),
        opacity: Joi.number().min(0).max(1),
        borderWidth: Joi.number().min(0),
        borderColor: inheritedColor,

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
