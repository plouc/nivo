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
import SizeLegendSvg from '../../src/svg/SizeLegendSvg'
import {
    SHAPE_SQUARE,
    SHAPE_CIRCLE,
    ANCHOR_TOP_LEFT,
    ANCHOR_TOP,
    ANCHOR_TOP_RIGHT,
    ANCHOR_RIGHT,
    ANCHOR_BOTTOM_RIGHT,
    ANCHOR_BOTTOM,
    ANCHOR_BOTTOM_LEFT,
    ANCHOR_LEFT,
    POSITION_TOP,
    POSITION_RIGHT,
    POSITION_BOTTOM,
    POSITION_LEFT,
} from '../../src/constants'

const shapes = [SHAPE_SQUARE, SHAPE_CIRCLE]

const anchors = [
    ANCHOR_TOP_LEFT,
    ANCHOR_TOP,
    ANCHOR_TOP_RIGHT,
    ANCHOR_RIGHT,
    ANCHOR_BOTTOM_RIGHT,
    ANCHOR_BOTTOM,
    ANCHOR_BOTTOM_LEFT,
    ANCHOR_LEFT,
]

const labelPositions = [POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]

anchors.forEach(anchor => {
    shapes.forEach(shape => {
        labelPositions.forEach(labelPosition => {
            it(`should support '${shape}' shape with '${anchor}' anchor and '${labelPosition}' labelPosition`, () => {
                const component = renderer.create(
                    <SizeLegendSvg shape={shape} anchor={anchor} labelPosition={labelPosition} />
                )

                const tree = component.toJSON()
                expect(tree).toMatchSnapshot()
            })
        })
    })
})
