import { FunctionComponent } from 'react'
import Joi from 'joi'
import { CirclePacking, CirclePackingSvgProps } from '@nivo/circle-packing'
import { custom } from './common'
import { dimensions } from './commons/dimensions'
import { inheritedColor, ordinalColors } from './commons/colors'
import { OmitStrict } from '../types'

export type CirclePackingApiProps = OmitStrict<
    CirclePackingSvgProps<any>,
    | 'isInteractive'
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'onClick'
    | 'zoomedId'
    | 'animate'
    | 'motionConfig'
>

export const circlePackingMapping = {
    component: CirclePacking as FunctionComponent<CirclePackingApiProps>,
    schema: Joi.object<CirclePackingApiProps>().keys({
        data: custom.object().required(),
        id: Joi.string(),
        value: Joi.string(),
        valueFormat: Joi.string(),
        padding: Joi.number(),
        leavesOnly: Joi.boolean(),
        width: dimensions.width,
        height: dimensions.height,
        margin: dimensions.margin,

        colors: ordinalColors,
        colorBy: Joi.any().valid('id', 'depth'),
        inheritColorFromParent: Joi.boolean(),
        childColor: inheritedColor,
        borderWidth: Joi.number(),
        borderColor: inheritedColor,

        enableLabels: Joi.boolean(),
        label: Joi.string(),
        labelsSkipRadius: Joi.number(),
        labelTextColor: inheritedColor,
    }),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
}
