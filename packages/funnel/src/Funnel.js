/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { SvgWrapper, withContainer, useDimensions } from '@nivo/core'
import { FunnelPropTypes, FunnelDefaultProps } from './props'
import { useFunnel } from './hooks'
import { Parts } from './Parts'
import { PartLabels } from './PartLabels'
import { Separators } from './Separators'
import { FunnelAnnotations } from './FunnelAnnotations'

const Funnel = props => {
    const {
        data,
        width,
        height,
        margin: partialMargin,
        direction,
        interpolation,
        spacing,
        shapeBlending,
        valueFormat,
        colors,
        fillOpacity,
        borderWidth,
        borderColor,
        borderOpacity,
        enableLabel,
        labelColor,
        enableBeforeSeparators,
        beforeSeparatorLength,
        beforeSeparatorOffset,
        enableAfterSeparators,
        afterSeparatorLength,
        afterSeparatorOffset,
        layers,
        annotations,
        isInteractive,
        currentPartSizeExtension,
        currentBorderWidth,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
    } = props

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        areaGenerator,
        borderGenerator,
        parts,
        beforeSeparators,
        afterSeparators,
        customLayerProps,
    } = useFunnel({
        data,
        width: innerWidth,
        height: innerHeight,
        direction,
        interpolation,
        spacing,
        shapeBlending,
        valueFormat,
        colors,
        fillOpacity,
        borderWidth,
        borderColor,
        borderOpacity,
        labelColor,
        enableBeforeSeparators,
        beforeSeparatorLength,
        beforeSeparatorOffset,
        enableAfterSeparators,
        afterSeparatorLength,
        afterSeparatorOffset,
        isInteractive,
        currentPartSizeExtension,
        currentBorderWidth,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
    })

    const layerById = {
        separators: (
            <Separators
                key="separators"
                beforeSeparators={beforeSeparators}
                afterSeparators={afterSeparators}
            />
        ),
        parts: (
            <Parts
                key="parts"
                parts={parts}
                areaGenerator={areaGenerator}
                borderGenerator={borderGenerator}
                enableLabel={enableLabel}
            />
        ),
        annotations: (
            <FunnelAnnotations
                key="annotations"
                parts={parts}
                annotations={annotations}
                widh={innerWidth}
                height={innerHeight}
            />
        ),
        labels: null,
    }

    if (enableLabel === true) {
        layerById.labels = <PartLabels key="labels" parts={parts} />
    }

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{layer(customLayerProps)}</Fragment>
                }

                return layerById[layer]
            })}
        </SvgWrapper>
    )
}

Funnel.propTypes = FunnelPropTypes

const WrappedFunnel = withContainer(Funnel)
WrappedFunnel.defaultProps = FunnelDefaultProps

export default WrappedFunnel
