import React from 'react'
import renderer from 'react-test-renderer'
import Waffle from '../src/Waffle'

it('should render a basic waffle chart in SVG', () => {
    const component = renderer.create(
        <Waffle width={400} height={400} rows={10} columns={10} data={[{ id: 'one', value: 10 }]} />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

const fillModes = ['top', 'right', 'bottom', 'left']
for (const fillMode of fillModes) {
    it(`should support ${fillMode} fill mode`, () => {
        const component = renderer.create(
            <Waffle
                width={400}
                height={400}
                rows={10}
                columns={10}
                data={[{ id: 'one', value: 10 }]}
                fillDirection={fillMode}
            />
        )

        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
}
