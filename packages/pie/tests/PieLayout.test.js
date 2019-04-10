import React from 'react'
import renderer from 'react-test-renderer'
import PieLayout from '../src/PieLayout'

it('should compute pie layout properties to pass down to render function', () => {
    let props
    const render = p => {
        props = p

        return <span>testing</span>
    }

    renderer.create(
        <PieLayout
            width={200}
            height={200}
            colors={{ scheme: 'nivo' }}
            data={[{ id: 'testA', value: 100 }]}
        >
            {render}
        </PieLayout>
    )

    expect(props.arcs).toEqual([
        {
            data: {
                id: 'testA',
                value: 100,
            },
            index: 0,
            value: 100,
            startAngle: 0,
            endAngle: 6.283185307179587,
            padAngle: 0,
            angle: 6.283185307179587,
            angleDeg: 360.00000000000006,
            color: '#e8c1a0',
        },
    ])

    expect(typeof props.arcGenerator).toBe('function')

    expect(props).toHaveProperty('startAngle', 0)
    expect(props).toHaveProperty('endAngle', 360)
    expect(props).toHaveProperty('width', 200)
    expect(props).toHaveProperty('height', 200)
    expect(props).toHaveProperty('centerX', 100)
    expect(props).toHaveProperty('centerY', 100)
    expect(props).toHaveProperty('radius', 100)
    expect(props).toHaveProperty('innerRadius', 0)

    expect(props).toHaveProperty('debug')
})
