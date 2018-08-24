/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import setDisplayName from 'recompose/setDisplayName'
import { PiePropTypes } from './props'
import enhance from './enhance'
import PieLayout from './PieLayout'
import PieCanvasRenderer from './PieCanvasRenderer'

class PieCanvas extends Component {
    static propTypes = PiePropTypes

    render() {
        const {
            data,
            sortByValue,
            startAngle,
            endAngle,
            fit,
            padAngle,
            innerRadius,
            cornerRadius,
            width,
            height,
            colors,
            colorBy,
            ...topProps
        } = this.props

        return (
            <PieLayout
                width={width}
                height={height}
                data={data}
                sortByValue={sortByValue}
                startAngle={startAngle}
                endAngle={endAngle}
                fit={fit}
                padAngle={padAngle}
                innerRadius={innerRadius}
                cornerRadius={cornerRadius}
                colors={colors}
                colorBy={colorBy}
            >
                {props => <PieCanvasRenderer {...topProps} {...props} />}
            </PieLayout>
        )
    }
}

export default setDisplayName('PieCanvas')(enhance(PieCanvas))
