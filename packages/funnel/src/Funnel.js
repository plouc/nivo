/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { SvgWrapper, withContainer, useDimensions, useTheme, useMotionConfig } from '@nivo/core'
import { FunnelPropTypes, FunnelDefaultProps } from './props'
import { useFunnel } from './hooks'
import { Parts } from './Parts'

const Funnel = props => {
    const {
        data,

        width,
        height,
        margin: partialMargin,

        direction,
        interpolation,
        spacing,
        shapeContinuity,
        valueFormat,

        colors,
        fillOpacity,
        borderWidth,
        borderColor,
        borderOpacity,

        enableBeforeSeparators,
        beforeSeparatorsLength,
        beforeSeparatorsOffset,
        enableAfterSeparators,
        afterSeparatorsLength,
        afterSeparatorsOffset,

        layers,

        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    } = props

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const theme = useTheme()
    const { animate } = useMotionConfig()

    const { areaGenerator, borderGenerator, parts, beforeSeparators, afterSeparators } = useFunnel({
        data,
        width: innerWidth,
        height: innerHeight,
        direction,
        interpolation,
        spacing,
        shapeContinuity,
        valueFormat,
        colors,
        fillOpacity,
        borderWidth,
        borderColor,
        borderOpacity,
        beforeSeparatorsLength,
        beforeSeparatorsOffset,
        afterSeparatorsLength,
        afterSeparatorsOffset,
    })

    const layerById = {
        parts: (
            <Parts
                key="parts"
                width={innerWidth}
                parts={parts}
                areaGenerator={areaGenerator}
                borderGenerator={borderGenerator}
            />
        ),
    }

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} theme={theme}>
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return (
                        <Fragment key={i}>
                            {layer({
                                ...props,
                                innerWidth,
                                innerHeight,
                                outerWidth,
                                outerHeight,
                                parts,
                            })}
                        </Fragment>
                    )
                }

                return layerById[layer]
            })}
            <g transform={`translate(${innerWidth / 2}, 0)`}>
                {enableBeforeSeparators &&
                    beforeSeparators.map((separator, index) => {
                        return (
                            <line
                                key={separator.partId}
                                x1={separator.x0}
                                x2={separator.x1}
                                y1={separator.y}
                                y2={separator.y}
                                fill="none"
                                {...theme.grid.line}
                            />
                        )
                    })}
                {enableAfterSeparators &&
                    afterSeparators.map((separator, index) => {
                        return (
                            <line
                                key={separator.partId}
                                x1={separator.x0}
                                x2={separator.x1}
                                y1={separator.y}
                                y2={separator.y}
                                fill="none"
                                {...theme.grid.line}
                            />
                        )
                    })}
            </g>
        </SvgWrapper>
    )
}

Funnel.propTypes = FunnelPropTypes
Funnel.defaultProps = FunnelDefaultProps

export default withContainer(Funnel)
