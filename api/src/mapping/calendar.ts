import { FunctionComponent } from 'react'
import Joi from 'joi'
import { Calendar, CalendarSvgProps } from '@nivo/calendar'
import { custom } from './common'
import { dimensions } from './commons/dimensions'
import { OmitStrict } from '../lib/types'

export type CalendarApiProps = OmitStrict<
    CalendarSvgProps,
    'isInteractive' | 'onClick' | 'tooltip' | 'renderWrapper' | 'role'
>

const calendarMapping = {
    component: Calendar as FunctionComponent<CalendarApiProps>,
    schema: Joi.object<CalendarApiProps>().keys({
        data: custom.array().min(1).required(),
        from: Joi.string().required(),
        to: Joi.string().required(),
        width: dimensions.width,
        height: dimensions.height,
        direction: Joi.any().valid('horizontal', 'vertical'),
        margin: dimensions.margin,
        align: Joi.any().valid(
            'center',
            'top',
            'top-right',
            'right',
            'bottom-right',
            'bottom',
            'bottom-left',
            'left',
            'top-left'
        ),
        minValue: Joi.alternatives().try(Joi.valid('auto'), Joi.number()),
        maxValue: Joi.alternatives().try(Joi.valid('auto'), Joi.number()),

        colors: Joi.array().items(Joi.string()),
        emptyColor: Joi.string(),

        yearSpacing: Joi.number().min(0),
        yearLegendPosition: Joi.any().valid('before', 'after'),
        yearLegendOffset: Joi.number(),

        monthSpacing: Joi.number().min(0),
        monthBorderWidth: Joi.number().min(0),
        monthBorderColor: Joi.string(),
        monthLegendPosition: Joi.any().valid('before', 'after'),
        monthLegendOffset: Joi.number(),

        daySpacing: Joi.number(),
        dayBorderWidth: Joi.number(),
        dayBorderColor: Joi.string(),
    }),
    runtimeProps: ['width', 'height', 'colors', 'direction'],
    defaults: {
        animate: false,
        margin: { top: 40, right: 50, bottom: 40, left: 50 },
    },
}

export default calendarMapping
