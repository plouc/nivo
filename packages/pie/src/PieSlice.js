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
import { BasicTooltip } from '@nivo/core'

const PieSlice = ({
    data,

    path,
    color,
    fill,
    borderWidth,
    borderColor,

    showTooltip,
    hideTooltip,
    onClick,
    tooltipFormat,
    tooltip,

    theme,
}) => {
    const handleTooltip = e =>
        showTooltip(
            <BasicTooltip
                id={data.label}
                value={data.value}
                enableChip={true}
                color={color}
                theme={theme}
                format={tooltipFormat}
                renderContent={
                    typeof tooltip === 'function' ? tooltip.bind(null, { color, ...data }) : null
                }
            />,
            e
        )

    return (
        <path
            key={data.id}
            d={path}
            fill={fill}
            strokeWidth={borderWidth}
            stroke={borderColor}
            onMouseEnter={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={hideTooltip}
            onClick={onClick}
        />
    )
}

PieSlice.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        value: PropTypes.number.isRequired,
    }).isRequired,

    path: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    onClick: PropTypes.func,

    theme: PropTypes.shape({
        tooltip: PropTypes.shape({}).isRequired,
    }).isRequired,
}

const enhance = compose(
    withPropsOnChange(['data', 'onClick'], ({ data, onClick }) => ({
        onClick: event => onClick(data, event),
    })),
    pure
)

export default enhance(PieSlice)
