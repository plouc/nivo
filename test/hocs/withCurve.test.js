/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { shallow } from 'enzyme'
import { curveLinear, curveBasis, curveMonotoneY } from 'd3-shape'
import withCurve from '../../src/hocs/withCurve'

it('should append d3 curve interpolator', () => {
    const Sample = withCurve()('div')

    const div = shallow(<Sample curve="linear" />).find('div')
    expect(div.prop('curveInterpolator')).toBe(curveLinear)
})

it('should allow to customize source key', () => {
    const Sample = withCurve({ srcKey: 'customSrc' })('div')

    const div = shallow(<Sample customSrc="basis" />).find('div')
    expect(div.prop('curveInterpolator')).toBe(curveBasis)
})

it('should allow to customize destination key', () => {
    const Sample = withCurve({ destKey: 'customDest' })('div')

    const div = shallow(<Sample curve="monotoneY" />).find('div')
    expect(div.prop('customDest')).toBe(curveMonotoneY)
})
