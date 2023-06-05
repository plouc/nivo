import { FunctionComponent } from 'react'
import Joi from 'joi'
import { Radar, RadarSvgProps } from '@bitbloom/nivo-radar'
import { blendMode, custom } from './common'
import { ordinalColors, inheritedColor } from './commons/colors'
import { dimensions } from './commons/dimensions'
import { closedCurve } from './commons/curves'
import { OmitStrict } from '../types'

export type RadarApiProps = OmitStrict<
    RadarSvgProps<any>,
    'renderWrapper' | 'layers' | 'isInteractive' | 'sliceTooltip' | 'animate' | 'motionConfig'
>

export const radarMapping = {
    component: Radar as FunctionComponent<RadarApiProps>,
    schema: Joi.object<RadarApiProps>().keys({
        data: custom.array().min(1).required(),
        indexBy: Joi.string().required(),
        keys: Joi.array().sparse(false).min(1).unique().required(),
        maxValue: Joi.alternatives().try(Joi.valid('auto'), Joi.number()),
        valueFormat: Joi.string(),
        curve: closedCurve,
        width: dimensions.width,
        height: dimensions.height,
        margin: dimensions.margin,

        theme: Joi.object(),
        colors: ordinalColors,
        fillOpacity: Joi.number().min(0).max(1),
        blendMode: blendMode,
        borderWidth: Joi.number().min(0),
        borderColor: inheritedColor,

        gridLevels: Joi.number().integer().positive(),
        gridShape: Joi.any().valid('linear', 'circular'),
        gridLabelOffset: Joi.number(),

        enableDots: Joi.boolean(),
        dotSize: Joi.number().min(0),
        dotColor: inheritedColor,
        dotBorderWidth: Joi.number().min(0),
        dotBorderColor: inheritedColor,
        enableDotLabel: Joi.boolean(),
        dotLabel: Joi.string(),
        dotLabelYOffset: Joi.number(),
    }),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 40, right: 40, bottom: 40, left: 40 },
    },
}
