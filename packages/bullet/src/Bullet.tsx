import React from 'react'
// @ts-ignore
import { Container, SvgWrapper, useDimensions } from '@nivo/core'
import { defaultProps } from './props'
import { BulletSvgProps } from './types'
import { BulletItem } from './BulletItem'
import { useEnhancedData } from './hooks'

export const Bullet = (props: BulletSvgProps) => {
    const {
        data,

        layout,
        spacing,
        measureSize,
        markerSize,
        reverse,
        axisPosition,

        margin: partialMargin,
        width,
        height,

        titlePosition,
        titleAlign,
        titleOffsetX,
        titleOffsetY,
        titleRotation,

        rangeComponent,
        rangeColors,

        measureComponent,
        measureColors,

        markerComponent,
        markerColors,

        theme,

        animate,
        motionConfig,

        isInteractive,
        onRangeClick,
        onMeasureClick,
        onMarkerClick,

        role,
    } = { ...defaultProps, ...props }

    const { margin, innerWidth, innerHeight } = useDimensions(width, height, partialMargin)

    const itemHeight =
        layout === 'horizontal'
            ? (innerHeight - spacing * (data.length - 1)) / data.length
            : (innerWidth - spacing * (data.length - 1)) / data.length

    const measureHeight = itemHeight * measureSize
    const markerHeight = itemHeight * markerSize

    const enhancedData = useEnhancedData(data, {
        layout,
        reverse,
        width: innerWidth,
        height: innerHeight,
    })

    return (
        <Container
            isInteractive={isInteractive}
            theme={theme}
            animate={animate}
            motionConfig={motionConfig}
        >
            <SvgWrapper width={width} height={height} margin={margin} role={role}>
                {enhancedData.map((d, i) => (
                    <BulletItem
                        key={d.id}
                        {...d}
                        layout={layout}
                        reverse={reverse}
                        x={layout === 'vertical' ? itemHeight * i + spacing * i : 0}
                        y={layout === 'horizontal' ? itemHeight * i + spacing * i : 0}
                        width={innerWidth}
                        height={itemHeight}
                        titlePosition={titlePosition}
                        titleAlign={titleAlign}
                        titleOffsetX={titleOffsetX}
                        titleOffsetY={titleOffsetY}
                        titleRotation={titleRotation}
                        measureHeight={measureHeight}
                        markerHeight={markerHeight}
                        rangeComponent={rangeComponent}
                        rangeColors={rangeColors}
                        measureComponent={measureComponent}
                        measureColors={measureColors}
                        markerComponent={markerComponent}
                        markerColors={markerColors}
                        axisPosition={axisPosition}
                        onRangeClick={onRangeClick}
                        onMeasureClick={onMeasureClick}
                        onMarkerClick={onMarkerClick}
                    />
                ))}
            </SvgWrapper>
        </Container>
    )
}
