/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import withPropsOnChange from 'recompose/withPropsOnChange'
import { getColorsGenerator } from '../lib/colorUtils'

/**
 * This HOC watch colors related props change
 * and returns the corresponding color generator function.
 * Using it prevent from having a new ref each time
 * we pass through the component, useful for shallow comparison.
 */
export default (colorsKey = 'colors', colorByKey = 'colorBy', destKey = 'getColor') =>
    withPropsOnChange([colorsKey, colorByKey], props => ({
        [destKey]: getColorsGenerator(props[colorsKey], props[colorByKey]),
    }))
