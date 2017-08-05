/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { merge } from 'lodash'
import { TransitionMotion, spring } from 'react-motion'
import Nivo, { defaultTheme } from '../../../Nivo'
import { marginPropType, motionPropTypes } from '../../../props'
import { getColorsGenerator } from '../../../lib/colorUtils'
import { generateGroupedBars, generateStackedBars } from '../../../lib/charts/bar'
import SvgWrapper from '../SvgWrapper'
import Axes from '../../axes/Axes'
import Grid from '../../axes/Grid'
import BarItem from './BarItem'
import BarItemLabel from './BarItemLabel'

export default class Bar extends Component {
    static propTypes = {
        // data
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                data: PropTypes.arrayOf(
                    PropTypes.shape({
                        x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                        y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    })
                ).isRequired,
            })
        ).isRequired,

        groupMode: PropTypes.oneOf(['stacked', 'grouped']).isRequired,

        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        margin: marginPropType,
        xPadding: PropTypes.number.isRequired,

        // axes
        axes: PropTypes.object.isRequired,
        enableGridX: PropTypes.bool.isRequired,
        enableGridY: PropTypes.bool.isRequired,

        // labels
        enableLabels: PropTypes.bool.isRequired,

        // interactions
        onClick: PropTypes.func,

        // theming
        theme: PropTypes.object.isRequired,
        colors: PropTypes.any.isRequired,
        colorBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

        // motion
        ...motionPropTypes,
    }

    static defaultProps = {
        margin: Nivo.defaults.margin,
        groupMode: 'stacked',
        xPadding: 0.1,
        enableLabels: true,
        axes: {
            left: {
                enabled: true,
            },
            bottom: {
                enabled: true,
            },
        },
        enableGridX: false,
        enableGridY: true,

        // theming
        theme: {},
        colors: Nivo.defaults.colorRange,
        colorBy: 'serie.id',

        // motion
        animate: true,
        motionStiffness: Nivo.defaults.motionStiffness,
        motionDamping: Nivo.defaults.motionDamping,
    }

    render() {
        const {
            data,
            groupMode,
            margin: _margin,
            width: _width,
            height: _height,
            xPadding,
            axes,
            enableGridX,
            enableGridY,
            enableLabels,

            // theming
            theme: _theme,
            colors,
            colorBy,

            // motion
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const margin = Object.assign({}, Nivo.defaults.margin, _margin)
        const width = _width - margin.left - margin.right
        const height = _height - margin.top - margin.bottom

        const theme = merge({}, defaultTheme, _theme)
        const color = getColorsGenerator(colors, colorBy)

        const motionProps = {
            animate,
            motionDamping,
            motionStiffness,
        }

        let result
        if (groupMode === 'grouped') {
            result = generateGroupedBars(data, width, height, color, {
                xPadding,
            })
        } else if (groupMode === 'stacked') {
            result = generateStackedBars(data, width, height, color, {
                xPadding,
            })
        }

        let bars
        if (animate === true) {
            bars = (
                <TransitionMotion
                    /*
                    willEnter={this.willEnter}
                    willLeave={this.willLeave}
                    */
                    styles={result.bars.map(bar => {
                        return {
                            key: bar.key,
                            data: {
                                color: bar.color,
                                value: bar.value,
                            },
                            style: {
                                x: spring(bar.x, motionProps),
                                y: spring(bar.y, motionProps),
                                width: spring(bar.width, motionProps),
                                height: spring(bar.height, motionProps),
                            },
                        }
                    })}
                >
                    {interpolatedStyles =>
                        <g>
                            {interpolatedStyles.map(({ key, style, data: { value, color } }) =>
                                <BarItem
                                    key={key}
                                    x={style.x}
                                    y={style.y}
                                    width={style.width}
                                    height={style.height}
                                    color={color}
                                />
                            )}
                        </g>}
                </TransitionMotion>
            )
        } else {
            bars = result.bars.map(d => <BarItem key={d.key} {...d} />)
        }

        return (
            <SvgWrapper width={_width} height={_height} margin={margin}>
                <Grid
                    theme={theme}
                    width={width}
                    height={height}
                    xScale={enableGridX ? result.xScale : null}
                    yScale={enableGridY ? result.yScale : null}
                    {...motionProps}
                />
                <Axes
                    axes={axes}
                    xScale={result.xScale}
                    yScale={result.yScale}
                    width={width}
                    height={height}
                    theme={theme}
                    {...motionProps}
                />
                {bars}
                {enableLabels && result.bars.map(d => <BarItemLabel {...d} key={d.key} />)}
            </SvgWrapper>
        )
    }
}
