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
import { PartLabels } from './PartLabels'
import { Separators } from './Separators'

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

        isInteractive,
        currentPartSizeExtension,
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

    const {
        areaGenerator,
        borderGenerator,
        parts,
        beforeSeparators,
        afterSeparators,
        setCurrentPartId,
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
        beforeSeparatorLength,
        beforeSeparatorOffset,
        afterSeparatorLength,
        afterSeparatorOffset,
        currentPartSizeExtension,
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
                setCurrentPartId={setCurrentPartId}
            />
        ),
        labels: null,
    }

    if (enableLabel === true) {
        layerById.labels = <PartLabels key="labels" parts={parts} />
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
        </SvgWrapper>
    )
}

Funnel.propTypes = FunnelPropTypes
Funnel.defaultProps = FunnelDefaultProps

export default withContainer(Funnel)
