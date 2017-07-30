/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Nivo from '../../Nivo'
import { margin as marginPropType } from '../../PropTypes'
import Scale from '../scales/Scale'

const defaultTheme = {
    axis: {
        textColor: '#000',
        fontSize: '11px',
        tickColor: '#000',
        legendColor: '#000',
        legendFontSize: '11px',
    },
    grid: {
        stroke: '#000',
        strokeDasharray: '3,6',
    },
}

export default class Chart extends Component {
    static propTypes = {
        // dimensions
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        margin: marginPropType,
        // composition
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]),
        // data
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        // motion
        animate: PropTypes.bool.isRequired,
        motionStiffness: PropTypes.number.isRequired,
        motionDamping: PropTypes.number.isRequired,
    }

    static defaultProps = {
        // dimensions
        margin: Nivo.defaults.margin,
        // motion
        animate: true,
        motionStiffness: Nivo.defaults.motionStiffness,
        motionDamping: Nivo.defaults.motionDamping,
    }

    static childContextTypes = {
        nivoTheme: PropTypes.object.isRequired,
    }

    getChildContext() {
        const theme = _.merge({}, defaultTheme, this.props.theme || {})

        return { nivoTheme: theme }
    }

    render() {
        const {
            data,
            children,
            margin: _margin,
            width: _width,
            height: _height,
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const animationProps = {
            animate,
            motionStiffness,
            motionDamping,
        }

        const margin = Object.assign({}, Nivo.defaults.margin, _margin)
        const width = _width - margin.left - margin.right
        const height = _height - margin.top - margin.bottom

        const scales = {}
        const axes = []
        const items = []

        React.Children.forEach(children, (child, i) => {
            if (child.type === Scale) {
                scales[child.props.id] = Scale.create(
                    child.props,
                    data,
                    width,
                    height
                )
            } else {
                const item = React.cloneElement(child, {
                    ...child.props,
                    ...animationProps,
                    key: i,
                    data,
                    scales,
                    width,
                    height,
                })

                items.push(item)
            }
        })

        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={_width}
                height={_height}
            >
                <g transform={`translate(${margin.left},${margin.top})`}>
                    {axes}
                    {items}
                </g>
            </svg>
        )
    }
}
