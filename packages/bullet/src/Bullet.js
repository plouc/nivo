/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import setDisplayName from 'recompose/setDisplayName'
import { Container, SvgWrapper } from '@nivo/core'
import { BulletPropTypes } from './props'
import enhance from './enhance'
import BulletItem from './BulletItem'

export class Bullet extends Component {
    static propTypes = BulletPropTypes

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
        } = this.props

        let itemHeight
        if (layout === 'horizontal') {
            itemHeight = (height - spacing * (data.length - 1)) / data.length
        } else {
            itemHeight = (width - spacing * (data.length - 1)) / data.length
        }
        const measureHeight = itemHeight * measureSize
        const markerHeight = itemHeight * markerSize

        const enhancedData = data.map(d => {
            const all = [...d.ranges, ...d.measures, ...d.markers]

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
                {({ showTooltip, hideTooltip }) => (
                    <SvgWrapper
                        width={outerWidth}
                        height={outerHeight}
                        margin={margin}
                        theme={theme}
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

Bullet.displayName = 'Bullet'

export default setDisplayName(Bullet.displayName)(enhance(Bullet))
