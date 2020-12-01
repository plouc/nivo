import React, { useMemo } from 'react'
// @ts-ignore
import { Container, SvgWrapper, useDimensions, bindDefs } from '@nivo/core'
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
        valueFormat,

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

        defs = [],
        fill = [],

        role,

        // interactivity
        isInteractive,
        tooltip,

        // event handlers
        onClick,
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
    } = { ...defaultProps, ...props }

    const { innerHeight, innerWidth, margin, outerHeight, outerWidth } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { centerX, centerY, radius } = useMemo(() => {
        const radius = Math.min(innerWidth, innerHeight) / 2

        return { radius, centerX: innerWidth / 2, centerY: innerHeight / 2 }
    }, [innerHeight, innerWidth])

    const { arcGenerator, nodes } = useSunburst({
        childColor,
        colors,
        cornerRadius,
        data,
        id,
        radius,
        value,
        valueFormat,
    })

    const filteredNodes = useMemo(() => nodes.filter(node => node.depth > 0), [nodes])

    const boundDefs = bindDefs(defs, nodes, fill, {
        dataKey: 'data',
        colorKey: 'data.color',
        targetKey: 'data.fill',
    })

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            defs={boundDefs}
            margin={margin}
            role={role}
        >
            <g transform={`translate(${centerX}, ${centerY})`}>
                {filteredNodes.map(node => (
                    <SunburstArc<RawDatum>
                        key={node.data.id}
                        node={node}
                        arcGenerator={arcGenerator}
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                        isInteractive={isInteractive}
                        tooltip={tooltip}
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onMouseMove={onMouseMove}
                    />
                ))}
                {enableSliceLabels && (
                    <SunburstLabels<RawDatum>
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
    animate = defaultProps.animate,
    motionConfig = defaultProps.motionConfig,
    theme,
    ...otherProps
}: SvgProps<RawDatum>) => (
    <Container {...{ isInteractive, animate, motionConfig, theme }}>
        <InnerSunburst<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
