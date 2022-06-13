import { FunctionComponent } from 'react'
import Joi from 'joi'
import { Sunburst, SunburstSvgProps } from '@nivo/sunburst'
import { custom } from './common'
import { ordinalColors, inheritedColor } from './commons/colors'
import { dimensions } from './commons/dimensions'
import { OmitStrict } from '../types'

export type SunburstApiProps = OmitStrict<
    SunburstSvgProps<any>,
    | 'isInteractive'
    | 'tooltip'
    | 'onClick'
    | 'animate'
    | 'motionConfig'
    | 'transitionMode'
    | 'renderWrapper'
>

export const sunburstMapping = {
    component: Sunburst as FunctionComponent<SunburstApiProps>,
    schema: Joi.object<SunburstApiProps>().keys({
        data: custom.object().required(),
        id: Joi.string(),
        value: Joi.string(),
        valueFormat: Joi.string(),
        cornerRadius: Joi.number().min(0),
        width: dimensions.width,
        height: dimensions.height,
        margin: dimensions.margin,

        colors: ordinalColors,
        colorBy: Joi.any().valid('id', 'depth'),
        inheritColorFromParent: Joi.boolean(),
        childColor: inheritedColor,
        borderWidth: Joi.number().min(0),
        borderColor: inheritedColor,

        enableArcLabels: Joi.boolean(),
        arcLabel: Joi.string(),
        arcLabelsRadiusOffset: Joi.number(),
        arcLabelsSkipAngle: Joi.number().min(0),
        arcLabelsTextColor: inheritedColor,
    }),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
}
