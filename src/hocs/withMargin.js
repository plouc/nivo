/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { isEqual } from 'lodash'
import withPropsOnChange from 'recompose/withPropsOnChange'
import Nivo from '../Nivo'

/**
 * This HOC watch width, height & margin props change
 * and returns new width/height plus outer dimensions.
 * Using it prevent from having a new ref each time
 * we pass through the component, useful for shallow comparison.
 */
export default () =>
    withPropsOnChange(
        (props, nextProps) =>
            props.width !== nextProps.width ||
            props.height !== nextProps.height ||
            !isEqual(props.margin, nextProps.margin),
        props => {
            const margin = Object.assign({}, Nivo.defaults.margin, props.margin)

            return {
                margin,
                width: props.width - margin.left - margin.right,
                height: props.height - margin.top - margin.bottom,
                outerWidth: props.width,
                outerHeight: props.height,
            }
        }
    )
