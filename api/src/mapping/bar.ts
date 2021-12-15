import { FunctionComponent } from 'react'
import Joi from 'joi'
import { Bar, BarSvgProps } from '@nivo/bar'
import { OmitStrict } from '../lib/types'
import { custom, axes } from './common'
import { dimensions } from './commons/dimensions'
import { inheritedColor, ordinalColors } from './commons/colors'

// filter out all dynamic properties
export type BarApiProps = OmitStrict<
    BarSvgProps<any>,
    | 'isInteractive'
    | 'animate'
    | 'motionConfig'
    | 'onClick'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'tooltip'
    | 'tooltipLabel'
    | 'layers'
    | 'role'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
    | 'isFocusable'
    | 'barAriaLabel'
    | 'barAriaLabelledBy'
    | 'barAriaDescribedBy'
    | 'renderWrapper'
    | 'initialHiddenIds'
>

const barMapping = {
    component: Bar as FunctionComponent<BarApiProps>,
    schema: Joi.object<BarApiProps>().keys({
        width: dimensions.width,
        height: dimensions.height,
        margin: dimensions.margin,
        data: custom.array().min(1).required(),
        indexBy: Joi.string().required(),
        keys: Joi.array().sparse(false).min(1).unique().required(),
        indexScale: Joi.object()
            .keys({
                type: Joi.any().valid('band'),
                round: Joi.boolean(),
            })
            .allow(null),
        valueScale: Joi.object()
            .keys({
                type: Joi.any().valid('linear'),
            })
            .allow(null),

        groupMode: Joi.any().valid('grouped', 'stacked'),
        layout: Joi.any().valid('horizontal', 'vertical'),
        reverse: Joi.boolean(),

        minValue: Joi.alternatives().try(Joi.any().valid('auto'), Joi.number()).required(),
        maxValue: Joi.alternatives().try(Joi.any().valid('auto'), Joi.number()).required(),
        padding: Joi.number(),
        innerPadding: Joi.number(),

        borderRadius: Joi.number().min(0),
        borderWidth: Joi.number().min(0),
        borderColor: inheritedColor,

        enableGridX: Joi.boolean(),
        enableGridY: Joi.boolean(),
        axisTop: axes.axisTop,
        axisRight: axes.axisRight,
        axisBottom: axes.axisBottom,
        axisLeft: axes.axisLeft,

        enableLabel: Joi.boolean(),
        label: Joi.string(),
        labelSkipWidth: Joi.number(),
        labelSkipHeight: Joi.number(),
        labelTextColor: inheritedColor,

        colors: ordinalColors,
        colorBy: Joi.string(),
    }),
    runtimeProps: ['width', 'height', 'colors', 'groupMode'],
    defaults: {
        margin: { top: 40, right: 50, bottom: 40, left: 50 },
    },
}

export default barMapping
