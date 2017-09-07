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
import { defaultMargin } from '../../src/defaults'
import withDimensions from '../../src/hocs/withDimensions'

it('should add default margin', () => {
    const Sample = withDimensions()('div')

    const div = shallow(<Sample width={300} height={200} />)
        .dive()
        .find('div')
    expect(div.prop('margin')).toEqual(defaultMargin)
})

it('should compute inner and outer dimensions', () => {
    const Sample = withDimensions()('div')

    const div = shallow(
        <Sample width={300} height={200} margin={{ top: 50, right: 20, bottom: 50, left: 20 }} />
    )
        .dive()
        .find('div')
    expect(div.prop('outerWidth')).toBe(300)
    expect(div.prop('outerHeight')).toBe(200)
    expect(div.prop('width')).toBe(260)
    expect(div.prop('height')).toBe(100)
})
