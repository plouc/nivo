/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import setDisplayName from 'recompose/setDisplayName'
import { TransitionMotion, spring } from 'react-motion'
import { motionPropTypes } from '@nivo/core'
import { getLabelGenerator } from '@nivo/core'
import { DotsItem } from '@nivo/core'

const LineDotsSvg = ({
    data,
    xScale,
    yScale,

    symbol,
    size,
    color,
    borderWidth,
    borderColor,

    // labels
    enableLabel,
    getLabel,
    labelYOffset,

    // theming
    theme,

    // motion
    animate,
    motionStiffness,
    motionDamping,
}) => {
    const points = data.points.filter(point => point.value !== null).map(point => {
        const pointData = {
            serie: { id: data.id },
            x: point.key,
            y: point.value,
        }

        return {
            key: `${data.id}.${point.x}`,
            x: xScale(point.x),
            y: yScale(point.y),
            fill: color(data),
            stroke: borderColor(data),
            label: enableLabel ? getLabel(pointData) : null,
        }
    })

    if (animate !== true) {
        return (
            <Fragment>
                {points.map(point => (
                    <DotsItem
                        key={point.key}
                        x={point.x}
                        y={point.y}
                        symbol={symbol}
                        size={size}
                        color={point.fill}
                        borderWidth={borderWidth}
                        borderColor={point.stroke}
                        label={point.label}
                        labelYOffset={labelYOffset}
                        theme={theme}
                    />
                ))}
            </Fragment>
        )
    }
    const springConfig = {
        motionDamping,
        motionStiffness,
    }

    return (
        <TransitionMotion
            styles={points.map(point => ({
                key: point.key,
                data: point,
                style: {
                    x: spring(point.x, springConfig),
                    y: spring(point.y, springConfig),
                    size: spring(size, springConfig),
                },
            }))}
        >
            {interpolatedStyles => (
                <Fragment>
                    {interpolatedStyles.map(({ key, style, data: point }) => (
                        <DotsItem
                            key={key}
                            {...style}
                            symbol={symbol}
                            color={point.fill}
                            borderWidth={borderWidth}
                            borderColor={point.stroke}
                            label={point.label}
                            labelYOffset={labelYOffset}
                            theme={theme}
                        />
                    ))}
                </Fragment>
            )}
        </TransitionMotion>
    )
}

LineDotsSvg.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,

    symbol: PropTypes.func,
    size: PropTypes.number.isRequired,
    color: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.func.isRequired,

    // labels
    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.string,
    labelYOffset: PropTypes.number,

    // theming
    theme: PropTypes.shape({
        dots: PropTypes.shape({
            textColor: PropTypes.string.isRequired,
            fontSize: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,

    // motion
    ...motionPropTypes,
}

LineDotsSvg.defaultProps = {
    // labels
    enableLabel: false,
    label: 'y',
}

const enhance = compose(
    withPropsOnChange(['label', 'labelFormat'], ({ label, labelFormat }) => ({
        getLabel: getLabelGenerator(label, labelFormat),
    })),
    pure
)

export default setDisplayName('LineDotsSvg')(enhance(LineDotsSvg))
