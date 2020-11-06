import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { setDisplayName } from 'recompose'
// @ts-ignore
import { Container, SvgWrapper } from '@nivo/core'
import { defaultProps } from './props'
import { BulletSvgProps, TooltipHandlers } from './types'
import enhance from './enhance'
import BulletItem from './BulletItem'

export class Bullet extends Component<BulletSvgProps> {
    static displayName = 'Bullet'

    render() {
        const {
            data,

            layout,
            spacing,
            measureSize,
            markerSize,
            reverse,
            axisPosition,

            margin,
            width,
            height,
            outerWidth,
            outerHeight,

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
            motionStiffness,
            motionDamping,

            isInteractive,
            onRangeClick,
            onMeasureClick,
            onMarkerClick,

            role,
        } = { height: 0, width: 0, ...defaultProps, ...this.props }

        const itemHeight =
            layout === 'horizontal'
                ? (height - spacing * (data.length - 1)) / data.length
                : (width - spacing * (data.length - 1)) / data.length

        const measureHeight = itemHeight * measureSize
        const markerHeight = itemHeight * markerSize

        const enhancedData = data.map(d => {
            const all = [...d.ranges, ...d.measures, ...(d.markers ?? [])]

            const max = Math.max(...all)

            const min = Math.min(...all, 0)

            const scale = scaleLinear().domain([min, max])

            if (layout === 'horizontal') {
                scale.range(reverse === true ? [width, 0] : [0, width])
            } else {
                scale.range(reverse === true ? [0, height] : [height, 0])
            }

            return {
                ...d,
                scale,
            }
        })

        return (
            <Container
                isInteractive={isInteractive}
                theme={theme}
                animate={animate}
                motionStiffness={motionStiffness}
                motionDamping={motionDamping}
            >
                {({ showTooltip, hideTooltip }: TooltipHandlers<unknown>) => (
                    <SvgWrapper
                        width={outerWidth}
                        height={outerHeight}
                        margin={margin}
                        theme={theme}
                        role={role}
                    >
                        {enhancedData.map((d, i) => (
                            <BulletItem
                                key={d.id}
                                {...d}
                                layout={layout}
                                reverse={reverse}
                                x={layout === 'vertical' ? itemHeight * i + spacing * i : 0}
                                y={layout === 'horizontal' ? itemHeight * i + spacing * i : 0}
                                width={width}
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
                                theme={theme}
                                axisPosition={axisPosition}
                                animate={animate}
                                motionStiffness={motionStiffness}
                                motionDamping={motionDamping}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                onRangeClick={onRangeClick}
                                onMeasureClick={onMeasureClick}
                                onMarkerClick={onMarkerClick}
                            />
                        ))}
                    </SvgWrapper>
                )}
            </Container>
        )
    }
}

export default setDisplayName(Bullet.displayName)(enhance(Bullet))
