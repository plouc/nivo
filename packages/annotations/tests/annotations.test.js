/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import renderer from 'react-test-renderer'
import { linearScale } from '@nivo/scales'
import Annotation from '../src/annotations'

const xScale = linearScale({ axis: 'x' }, { x: { min: 0, max: 10 } }, 100, 100)
const yScale = linearScale({ axis: 'y' }, { y: { min: 0, max: 10 } }, 100, 100)

const annotations = [
    {
        type: 'label',
        x: 2,
        y: 3.6,
        dx: 30,
        dy: 30,
        note: {
            label: 'This is a noteworthy datapoint',
            orientation: 'leftRight',
        },
        connector: {
            type: 'elbow',
        },
    },
    {
        type: 'xyThreshold',
        x: 6.5,
        y: 2,
        dx: 30,
        dy: 30,
        note: {
            label: 'This is a vertical line',
            orientation: 'leftRight',
        },
        subject: {
            y1: 0,
            y2: 10,
        },
    },
]

it('renders a basic annotation', () => {
    const tree = renderer
        .create(<Annotation {...annotations[0]} xScale={xScale} yScale={yScale} />)
        .toJSON()
    expect(tree).toMatchSnapshot()
})

it('renders a threshold line annotation', () => {
    const tree = renderer
        .create(<Annotation {...annotations[0]} xScale={xScale} yScale={yScale} />)
        .toJSON()
    expect(tree).toMatchSnapshot()
})
