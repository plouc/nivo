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
import LegendSvgItem from '../../src/svg/LegendSvgItem'
import {
    DIRECTION_LEFT_TO_RIGHT,
    DIRECTION_RIGHT_TO_LEFT,
    DIRECTION_TOP_TO_BOTTOM,
    DIRECTION_BOTTOM_TO_TOP,
} from '../../src/constants'

const commonProps = {
    x: 0,
    y: 0,
    width: 200,
    height: 36,
    label: 'testing',
    fill: 'red',
    textColor: 'black',
}

const directions = [
    DIRECTION_LEFT_TO_RIGHT,
    DIRECTION_RIGHT_TO_LEFT,
    DIRECTION_TOP_TO_BOTTOM,
    DIRECTION_BOTTOM_TO_TOP,
]

directions.forEach(direction => {
    it(`should support ${direction} direction`, () => {
        const component = renderer.create(<LegendSvgItem {...commonProps} direction={direction} />)

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })

    it(`should support ${direction} direction justified`, () => {
        const component = renderer.create(
            <LegendSvgItem {...commonProps} direction={direction} justify={true} />
        )

        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
