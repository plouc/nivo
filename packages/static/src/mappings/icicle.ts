import { FunctionComponent } from 'react'
import Joi from 'joi'
import { Icicle, IcicleSvgProps } from '@nivo/icicle'
import { BOX_ANCHORS } from '@nivo/core'
import { custom } from './common'
import { ordinalColors, inheritedColor } from './commons/colors'
import { dimensions } from './commons/dimensions'
import { OmitStrict } from '../types'

export type IcicleApiProps = OmitStrict<
    IcicleSvgProps<any>,
    | 'isInteractive'
    | 'tooltip'
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'onClick'
    | 'onWheel'
    | 'onContextMenu'
    | 'animate'
    | 'motionConfig'
    | 'renderWrapper'
    | 'labelComponent'
    | 'enableZooming'
    | 'zoomMode'
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
        orientation: Joi.any().valid('top', 'right', 'bottom', 'left'),
        inheritColorFromParent: Joi.boolean(),
        childColor: inheritedColor,
        borderWidth: Joi.number().min(0),
        borderColor: inheritedColor,

        enableLabels: Joi.boolean(),
        label: Joi.string(),
        labelAnchor: Joi.any().valid(...BOX_ANCHORS),
        labelPaddingX: Joi.number(),
        labelPaddingY: Joi.number(),
        labelRotation: Joi.number(),
        labelSkipWidth: Joi.number().min(0),
        labelSkipHeight: Joi.number().min(0).max(100),
        labelTextColor: inheritedColor,
    }),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
}
