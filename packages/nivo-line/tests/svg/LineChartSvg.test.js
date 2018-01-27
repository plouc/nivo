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
import LineChartSvg from '../../src/svg/LineChartSvg'

const sampleData = [
    {
        id: 'A',
        data: [
            { x: 0, y: 10 },
            { x: 10, y: 12 },
            { x: 20, y: 16 },
            { x: 30, y: 23 },
            { x: 40, y: 27 },
            { x: 50, y: 27 },
            { x: 60, y: 25 },
        ],
    },
    {
        id: 'B',
        data: [
            { x: 0, y: 9 },
            { x: 10, y: 7 },
            { x: 20, y: 5 },
            { x: 30, y: 11 },
            { x: 40, y: 17 },
            { x: 50, y: 23 },
            { x: 60, y: 26 },
        ],
    },
]

it('should render a basic line chart', () => {
    const component = renderer.create(
        <LineChartSvg width={500} height={300} data={[sampleData[0]]} />
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should render multiple lines', () => {
    const component = renderer.create(<LineChartSvg width={500} height={300} data={sampleData} />)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should support stacked mode', () => {
    const component = renderer.create(
        <LineChartSvg width={500} height={300} data={sampleData} stacked={true} />
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
