/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import setPropTypes from 'recompose/setPropTypes'
import withPropsOnChange from 'recompose/withPropsOnChange'
import { hierarchy } from 'd3-hierarchy'
import { getAccessorFor } from '../lib/propertiesConverters'

/**
 * This HOC watch hierarchical data props change
 * and returns the corresponding summed hierarchy.
 * Using it prevent from having a new ref each time
 * we pass through the component, useful for shallow comparison.
 */
export default ({
    srcKey = 'root',
    destKey = 'root',
    valueKey = 'value',
    valueDefault = 'value',
} = {}) =>
    compose(
        defaultProps({
            [valueKey]: valueDefault,
        }),
        setPropTypes({
            [srcKey]: PropTypes.object.isRequired,
            [valueKey]: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        }),
        withPropsOnChange([srcKey, valueKey], props => ({
            [destKey]: hierarchy(props[srcKey]).sum(getAccessorFor(props[valueKey])),
        }))
    )
