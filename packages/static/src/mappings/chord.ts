import { FunctionComponent } from 'react'
import Joi from 'joi'
import { Dimensions } from '@bitbloom/nivo-core'
import { Chord, ChordSvgProps } from '@bitbloom/nivo-chord'
import { custom } from './common'
import { ordinalColors, inheritedColor } from './commons/colors'
import { dimensions } from './commons/dimensions'
import { OmitStrict } from '../types'

// filter out all dynamic properties
export type ChordApiProps = OmitStrict<
    ChordSvgProps & Dimensions,
    | 'isInteractive'
    | 'animate'
    | 'motionConfig'
    | 'onRibbonMouseEnter'
    | 'onRibbonMouseMove'
    | 'onRibbonMouseLeave'
    | 'onRibbonClick'
    | 'ribbonTooltip'
    | 'activeRibbonOpacity'
    | 'inactiveRibbonOpacity'
    | 'onArcMouseEnter'
    | 'onArcMouseMove'
    | 'onArcMouseLeave'
    | 'arcTooltip'
    | 'activeArcOpacity'
    | 'inactiveArcOpacity'
    | 'onArcClick'
    | 'layers'
>

export const chordMapping = {
    component: Chord as unknown as FunctionComponent<ChordApiProps>,
    schema: Joi.object<ChordApiProps>().keys({
        width: dimensions.width,
        height: dimensions.height,
        margin: dimensions.margin,

        data: custom.array().required(),
        keys: Joi.array().required(),

        padAngle: Joi.number(),
        innerRadiusRatio: Joi.number().min(0).max(1),
        innerRadiusOffset: Joi.number().min(0).max(1),

        ribbonOpacity: Joi.number().min(0).max(1),
        ribbonBorderWidth: Joi.number().min(0),
        ribbonBorderColor: inheritedColor,

        arcOpacity: Joi.number().min(0).max(1),
        arcBorderWidth: Joi.number().min(0),
        arcBorderColor: inheritedColor,

        enableLabel: Joi.boolean(),
        label: Joi.string(),
        labelOffset: Joi.number(),
        labelRotation: Joi.number(),
        labelTextColor: inheritedColor,

        colors: ordinalColors,
    }),
    runtimeProps: [
        'width',
        'height',
        'padAngle',
        'innerRadiusRatio',
        'innerRadiusOffset',
        'ribbonOpacity',
        'arcOpacity',
        'colors',
    ],
    defaults: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
}
