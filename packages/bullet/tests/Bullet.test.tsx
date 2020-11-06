import React from 'react'
// tslint:disable-next-line no-implicit-dependencies
import { mount } from 'enzyme'
import { Bullet } from '../src'

const sampleData = [
    {
        id: 'A',
        ranges: [10, 20, 40],
        measures: [30],
        markers: [20],
    },
    {
        id: 'B',
        ranges: [100],
        measures: [20, 50],
        markers: [80],
    },
    {
        id: 'C',
        ranges: [50],
        measures: [10],
        markers: [40],
    },
]

describe('Bullet', () => {
    describe('data', () => {
        it('should render and not crash', () => {
            const wrapper = mount(<Bullet width={400} height={400} data={sampleData} />)

            expect(wrapper.exists()).toBe(true)
        })
    })
})
