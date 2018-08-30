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

            spacing,
            measureSize,
            markerSize,
            reverse,

            margin,
            width,
            height,
            outerWidth,
            outerHeight,

            theme,

            animate,
            motionStiffness,
            motionDamping,

            isInteractive,
        } = this.props

        const itemHeight = (height - spacing * (data.length - 1)) / data.length
        const measureHeight = itemHeight * measureSize
        const markerHeight = itemHeight * markerSize

        const enhancedData = data.map(d => {
            const all = [...d.ranges, ...d.measures, ...d.markers]

            const max = Math.max(...all)

            const scale = scaleLinear()
                .domain([0, max])
                .range(reverse === true ? [width, 0] : [0, width])

            return {
                ...d,
                scale,
            }
        })

        const motionProps = {
            animate,
            motionDamping,
            motionStiffness,
        }

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => (
                    <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
                        {enhancedData.map((d, i) => (
                            <BulletItem
                                key={d.id}
                                {...d}
                                x={0}
                                y={itemHeight * i + spacing * i}
                                width={width}
                                height={itemHeight}
                                measureHeight={measureHeight}
                                markerHeight={markerHeight}
                                theme={theme}
                                {...motionProps}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
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
