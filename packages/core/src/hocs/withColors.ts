/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as PropTypes from 'prop-types'
import { compose, setPropTypes, defaultProps, withPropsOnChange } from 'recompose'
import { getColorsGenerator } from '../lib/colors'

/**
 * This HOC watch colors related props change
 * and returns the corresponding color generator function.
 * Using it prevent from having a new ref each time
 * we pass through the component, useful for shallow comparison.
 */
export default ({
    colorsKey = 'colors',
    colorByKey = 'colorBy',
    destKey = 'getColor',
    defaultColors = 'nivo',
    defaultColorBy = 'id',
} = {}) =>
    compose(
        defaultProps({
            [colorsKey]: defaultColors,
            [colorByKey]: defaultColorBy,
        }),
        setPropTypes({
            [colorsKey]: PropTypes.any.isRequired,
            [colorByKey]: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        }),
        withPropsOnChange([colorsKey, colorByKey], props => ({
            [destKey]: getColorsGenerator(props[colorsKey], props[colorByKey]),
        }))
    )
