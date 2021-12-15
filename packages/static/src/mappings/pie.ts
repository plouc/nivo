import { FunctionComponent } from 'react'
import Joi from 'joi'
import { Pie, PieSvgProps } from '@nivo/pie'
import { ordinalColors, inheritedColor } from './commons/colors'
import { dimensions } from './commons/dimensions'
import { OmitStrict } from '../types'
import { custom } from './common'

export type PieApiProps = OmitStrict<
    PieSvgProps<any>,
    | 'layers'
    | 'isInteractive'
    | 'activeInnerRadiusOffset'
    | 'activeOuterRadiusOffset'
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'onClick'
    | 'tooltip'
    | 'animate'
    | 'motionConfig'
    | 'transitionMode'
    | 'renderWrapper'
>

export const pieMapping = {
    component: Pie as FunctionComponent<PieApiProps>,
    schema: Joi.object<PieApiProps>().keys({
        data: custom.array().min(1).required(),
        id: Joi.string(),
        value: Joi.string(),
        valueFormat: Joi.string(),
        width: dimensions.width,
        height: dimensions.height,
        startAngle: Joi.number(),
        endAngle: Joi.number(),
        fit: Joi.boolean(),
        innerRadius: Joi.number().min(0),
        padAngle: Joi.number().min(0),
        cornerRadius: Joi.number().min(0),
        sortByValue: Joi.boolean(),
        margin: dimensions.margin,

        theme: Joi.object(),
        colors: ordinalColors,
        borderWidth: Joi.number().min(0),
        borderColor: inheritedColor,

        enableArcLabels: Joi.boolean(),
        arcLabel: Joi.string(),
        arcLabelsRadiusOffset: Joi.number(),
        arcLabelsSkipAngle: Joi.number().min(0),
        arcLabelsTextColor: inheritedColor,

        enableArcLinkLabels: Joi.boolean(),
        arcLinkLabel: Joi.string(),
        arcLinkLabelsSkipAngle: Joi.number().min(0),
        arcLinkLabelsOffset: Joi.number(),
        arcLinkLabelsDiagonalLength: Joi.number().min(0),
        arcLinkLabelsStraightLength: Joi.number().min(0),
        arcLinkLabelsTextOffset: Joi.number(),
        arcLinkLabelsThickness: Joi.number().min(0),
        arcLinkLabelsTextColor: inheritedColor,
        arcLinkLabelsColor: inheritedColor,
    }),
    runtimeProps: ['width', 'height', 'colors', 'groupMode'],
    defaults: {
        margin: { top: 40, right: 50, bottom: 40, left: 50 },
    },
}
