import { FunctionComponent } from 'react'
import Joi from 'joi'
import { Icicles, IciclesSvgProps } from '@nivo/icicles'
import { custom } from './common'
import { ordinalColors, inheritedColor } from './commons/colors'
import { dimensions } from './commons/dimensions'
import { OmitStrict } from '../types'

export type IciclesApiProps = OmitStrict<
    IciclesSvgProps<any>,
    'isInteractive' | 'tooltip' | 'onClick' | 'animate' | 'motionConfig' | 'renderWrapper'
>

export const iciclesMapping = {
    component: Icicles as FunctionComponent<IciclesApiProps>,
    schema: Joi.object<IciclesApiProps>().keys({
        data: custom.object().required(),
        id: Joi.string(),
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
        rectLabelsOffset: Joi.number(),
        rectLabelsSkipLength: Joi.number().min(0),
        rectLabelsSkipPercentage: Joi.number().min(0).max(100),
    }),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
}
