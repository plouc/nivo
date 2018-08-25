import React from 'react'
import { render } from 'enzyme'
import Bubble from '../src/Bubble'

const sampleData = {
    id: 'nivo',
    children: [
        {
            id: 'bar',
            children: [
                { id: 'svg', value: 12 },
                { id: 'canvas', value: 34 },
                { id: 'html', value: 2 },
            ],
        },
        {
            id: 'line',
            children: [{ id: 'svg', value: 43 }, { id: 'canvas', value: 27 }],
        },
        {
            id: 'pie',
            children: [{ id: 'svg', value: 17 }, { id: 'canvas', value: 23 }],
        },
    ],
}

it('should render as much node as items', () => {
    const wrapper = render(<Bubble width={600} height={600} root={sampleData} />)

    expect(wrapper.find('circle').length).toBe(11)
})

it(`should skip parent nodes if 'leavesOnly' is 'true'`, () => {
    const wrapper = render(<Bubble width={600} height={600} root={sampleData} leavesOnly={true} />)

    expect(wrapper.find('circle').length).toBe(7)
})

it(`should render as much labels as leaves if 'enableLabel' is 'true'`, () => {
    const wrapper = render(<Bubble width={600} height={600} root={sampleData} enableLabel={true} />)

    expect(wrapper.find('text').length).toBe(7)
})

it(`should render no label if 'enableLabel' is 'false'`, () => {
    const wrapper = render(
        <Bubble width={600} height={600} root={sampleData} enableLabel={false} />
    )

    expect(wrapper.find('text').length).toBe(0)
})

it(`should allow to skip labels using 'labelSkipRadius' if radius is lower than given value`, () => {
    const wrapper = render(
        <Bubble
            width={600}
            height={600}
            root={sampleData}
            enableLabel={true}
            labelSkipRadius={24}
        />
    )

    expect(wrapper.find('text').length).toBe(6)
})
