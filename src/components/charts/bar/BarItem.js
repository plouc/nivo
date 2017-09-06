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
import BasicTooltip from '../../tooltip/BasicTooltip'

const BarItem = ({
    data,
    x,
    y,
    width,
    height,
    color,
    showTooltip,
    hideTooltip,
    onClick,
    theme,
}) => {
    const handleTooltip = e =>
        showTooltip(
            <BasicTooltip
                id={`${data.id} - ${data.indexValue}`}
                value={data.value}
                enableChip={true}
                color={color}
                theme={theme}
            />,
            e
        )

    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={color}
            onMouseEnter={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={hideTooltip}
            onClick={onClick}
        />
    )
}

BarItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        indexValue: PropTypes.string.isRequired,
    }).isRequired,

    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,

    theme: PropTypes.shape({
        tooltip: PropTypes.shape({}).isRequired,
    }).isRequired,
}

const enhance = compose(
    withPropsOnChange(['data', 'onClick'], ({ data, onClick }) => ({
        onClick: () => onClick(data),
    })),
    pure
)

export default enhance(BarItem)
