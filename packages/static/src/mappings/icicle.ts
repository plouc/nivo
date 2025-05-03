import { FunctionComponent } from 'react'
import Joi from 'joi'
import { Icicle, IcicleSvgProps } from '@nivo/icicle'
import { custom } from './common'
import { ordinalColors, inheritedColor } from './commons/colors'
import { dimensions } from './commons/dimensions'
import { OmitStrict } from '../types'

export type IcicleApiProps = OmitStrict<
    IcicleSvgProps<any>,
    'isInteractive' | 'tooltip' | 'onClick' | 'animate' | 'motionConfig' | 'renderWrapper'
>

export const icicleMapping = {
    component: Icicle as FunctionComponent<IcicleApiProps>,
    schema: Joi.object<IcicleApiProps>().keys({
        data: custom.object().required(),
        identity: Joi.string(),
        value: Joi.string(),
        valueFormat: Joi.string(),
        width: dimensions.width,
        height: dimensions.height,
        margin: dimensions.margin,

        colors: ordinalColors,
        colorBy: Joi.any().valid('id', 'depth'),
        direction: Joi.any().valid('top', 'right', 'bottom', 'left'),
        inheritColorFromParent: Joi.boolean(),
        childColor: inheritedColor,
        borderWidth: Joi.number().min(0),
        borderColor: inheritedColor,

        enableRectLabels: Joi.boolean(),
        rectLabel: Joi.string(),
        rectLabelsTextColor: inheritedColor,
        rectLabelsOffsetX: Joi.number(),
        rectLabelsOffsetY: Joi.number(),
        rectLabelsSkipWidth: Joi.number().min(0),
        rectLabelsSkipHeight: Joi.number().min(0).max(100),
    }),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
}
