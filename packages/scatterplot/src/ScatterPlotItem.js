/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'

const ScatterPlotItem = ({
    x,
    y,
    size,
    color,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    symbol,
    point,
}) =>
    React.createElement(symbol, {
        x,
        y,
        size,
        color,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        point,
    })

const DefaultSymbol = ({ x, y, size, color, onMouseEnter, onMouseMove, onMouseLeave, onClick }) => (
    <circle
        cx={x}
        cy={y}
        r={size / 2}
        fill={color}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
    />
)

const commonProps = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
}

DefaultSymbol.propTypes = commonProps

ScatterPlotItem.defaultProps = {
    symbol: DefaultSymbol,
}

ScatterPlotItem.propTypes = {
    point: PropTypes.shape({
        data: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            x: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
                .isRequired,
            y: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
                .isRequired,
            serie: PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            }).isRequired,
        }).isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,

    ...commonProps,

    symbol: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    theme: PropTypes.object.isRequired,
}

const enhance = compose(
    withPropsOnChange(
        ['point', 'onMouseEnter', 'onMouseMove', 'onMouseLeave', 'onClick'],
        ({ point, onMouseEnter, onMouseMove, onMouseLeave, onClick }) => ({
            onMouseEnter: event => onMouseEnter(point, event),
            onMouseMove: event => onMouseMove(point, event),
            onMouseLeave: event => onMouseLeave(point, event),
            onClick: event => onClick(point, event),
        })
    ),
    pure
)

export default enhance(ScatterPlotItem)
