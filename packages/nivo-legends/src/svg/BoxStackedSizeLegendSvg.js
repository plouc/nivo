/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
    ANCHOR_TOP,
    ANCHOR_TOP_RIGHT,
    ANCHOR_RIGHT,
    ANCHOR_BOTTOM_RIGHT,
    ANCHOR_BOTTOM,
    ANCHOR_BOTTOM_LEFT,
    ANCHOR_LEFT,
    ANCHOR_TOP_LEFT,
    ANCHOR_CENTER,
} from '../constants'
import { computePositionFromAnchor } from '../compute'
import StackedSizeLegendSvg from './StackedSizeLegendSvg'

/**
 * This component is a wrapper around the StackedSizeLegendSvg component.
 * It helps placing it inside chart viewport using declarative API.
 */
export default class BoxStackedSizeLegendSvg extends PureComponent {
    static propTypes = {
        containerWidth: PropTypes.number.isRequired,
        containerHeight: PropTypes.number.isRequired,
        translateX: PropTypes.number.isRequired,
        translateY: PropTypes.number.isRequired,
        anchor: PropTypes.oneOf([
            ANCHOR_TOP,
            ANCHOR_TOP_RIGHT,
            ANCHOR_RIGHT,
            ANCHOR_BOTTOM_RIGHT,
            ANCHOR_BOTTOM,
            ANCHOR_BOTTOM_LEFT,
            ANCHOR_LEFT,
            ANCHOR_TOP_LEFT,
            ANCHOR_CENTER,
        ]).isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                size: PropTypes.number.isRequired,
            })
        ).isRequired,
    }

    static defaultProps = {
        translateX: 0,
        translateY: 0,
    }

    render() {
        const {
            containerWidth,
            containerHeight,
            translateX,
            translateY,
            anchor,
            data,
            ...rest
        } = this.props

        const size = Math.max(...data.map(d => d.size))

        const { x, y } = computePositionFromAnchor({
            anchor,
            translateX,
            translateY,
            containerWidth,
            containerHeight,
            width: size,
            height: size,
        })

        return <StackedSizeLegendSvg x={x} y={y} data={data} {...rest} />
    }
}
