/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import compose from 'recompose/compose'
import setPropTypes from 'recompose/setPropTypes'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import { marginPropType } from '../props'
import { defaultMargin } from '../defaults'

/**
 * This HOC watch width, height & margin props change
 * and returns new width/height plus outer dimensions.
 * Using it prevent from having a new ref each time
 * we pass through the component, useful for shallow comparison.
 * It also add required propTypes & set default margin.
 */
export default () =>
    compose(
        defaultProps({
            margin: defaultMargin,
        }),
        setPropTypes({
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            margin: marginPropType,
        }),
        withPropsOnChange(
            (props, nextProps) =>
                props.width !== nextProps.width ||
                props.height !== nextProps.height ||
                !isEqual(props.margin, nextProps.margin),
            props => {
                const margin = Object.assign({}, defaultMargin, props.margin)

                return {
                    margin,
                    width: props.width - margin.left - margin.right,
                    height: props.height - margin.top - margin.bottom,
                    outerWidth: props.width,
                    outerHeight: props.height,
                }
            }
        )
    )
