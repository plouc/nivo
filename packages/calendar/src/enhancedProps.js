/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { CalendarPropTypes } from './props'
import { CalendarDefaultProps } from './props'

const {
    // eslint-disable-next-line no-unused-vars
    yearLegend,
    // eslint-disable-next-line no-unused-vars
    yearSpacing,
    // eslint-disable-next-line no-unused-vars
    yearLegendPosition,
    // eslint-disable-next-line no-unused-vars
    yearLegendOffset,
    ...filteredPropTypes
} = CalendarPropTypes

const enhancedCommonPropTypes = {
    ...filteredPropTypes,
    granularity: PropTypes.oneOf(['year', 'month']).isRequired,
    weekDirection: PropTypes.oneOf(['auto', 'horizontal', 'vertical']).isRequired,
    breakpoint: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
    blockLegend: PropTypes.func.isRequired,
    blockSpacing: PropTypes.number.isRequired,
    blockLegendPosition: PropTypes.oneOf(['before', 'after']).isRequired,
    blockLegendOffset: PropTypes.number.isRequired,
}

export const EnhancedCalendarPropTypes = enhancedCommonPropTypes

export const EnhancedCalendarCanvasPropTypes = {
    ...enhancedCommonPropTypes,
    pixelRatio: PropTypes.number.isRequired,
}

const {
    // eslint-disable-next-line no-unused-vars
    ['yearSpacing']: yearSpacingDefault,
    // eslint-disable-next-line no-unused-vars
    ['yearLegend']: yearLegendDefault,
    // eslint-disable-next-line no-unused-vars
    ['yearLegendPosition']: yearLegendPositionDefault,
    // eslint-disable-next-line no-unused-vars
    ['yearLegendOffset']: yearLegendOffsetDefault,
    ...filteredDefaultProps
} = CalendarDefaultProps
const enhancedCommonDefaultProps = {
    ...filteredDefaultProps,
    granularity: 'year',
    weekDirection: 'auto',
    breakpoint: 'auto',
    blockSpacing: 30,
    blockLegend: block => block.firstYear,
    blockLegendPosition: 'before',
    blockLegendOffset: 10,
}

export const EnhancedCalendarDefaultProps = enhancedCommonDefaultProps

export const EnhancedCalendarCanvasDefaultProps = {
    ...enhancedCommonDefaultProps,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
