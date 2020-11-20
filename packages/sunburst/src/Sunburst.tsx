import React, { useMemo } from 'react'
import { Container, SvgWrapper, useDimensions } from '@nivo/core'
import { SunburstLabels } from './SunburstLabels'
import { SunburstArc } from './SunburstArc'
import { defaultProps } from './props'
import { useSunburst } from './hooks'
import { SvgProps } from './types'

const InnerSunburst = <RawDatum,>(props: SvgProps<RawDatum>) => {
    const {
        data,
        id,
        value,

        colors,
        childColor,

        margin: partialMargin,
        width,
        height,

        cornerRadius,

        borderWidth,
        borderColor,

        // slices labels
        enableSliceLabels,
        sliceLabel,
        sliceLabelsSkipAngle,
        sliceLabelsTextColor,

        role,

        // interactivity
        tooltipFormat,
        tooltip,

        // event handlers
        onClick,
        onMouseEnter,
        onMouseLeave,
    } = { ...defaultProps, ...props }

    const { margin } = useDimensions(width, height, partialMargin)

    const { centerX, centerY, radius } = useMemo(() => {
        const radius = Math.min(width, height) / 2

        return { radius, centerX: width / 2, centerY: height / 2 }
    }, [height, width])

    const { arcGenerator, nodes } = useSunburst({
        childColor,
        colors,
        cornerRadius,
        data,
        id,
        value,
        radius,
    })

    return (
        <SvgWrapper width={width} height={height} margin={margin} role={role}>
            <g transform={`translate(${centerX}, ${centerY})`}>
                {nodes
                    .filter(node => node.depth > 0)
                    .map((node, i) => (
                        <SunburstArc
                            key={i}
                            node={node}
                            arcGenerator={arcGenerator}
                            borderWidth={borderWidth}
                            borderColor={borderColor}
                            tooltipFormat={tooltipFormat}
                            tooltip={tooltip}
                            onClick={onClick}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                        />
                    ))}
                {enableSliceLabels && (
                    <SunburstLabels
                        nodes={nodes}
                        label={sliceLabel}
                        skipAngle={sliceLabelsSkipAngle}
                        textColor={sliceLabelsTextColor}
                    />
                )}
            </g>
        </SvgWrapper>
    )
}

export const Sunburst = <RawDatum,>({
    isInteractive = defaultProps.isInteractive,
    theme,
    ...otherProps
}: SvgProps<RawDatum>) => (
    <Container theme={theme} isInteractive={isInteractive} animate={false}>
        <InnerSunburst<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
