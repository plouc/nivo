import React from 'react'
import renderer from 'react-test-renderer'
import WaffleHtml from '../src/Waffle'

it('should render a basic waffle chart in HTML', () => {
    const component = renderer.create(
        <WaffleHtml
            width={400}
            height={400}
            rows={10}
            columns={10}
            total={100}
            data={[{ id: 'one', label: 'one', value: 10 }]}
        />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

const fillModes = ['top', 'right', 'bottom', 'left']
for (const fillMode of fillModes) {
    it(`should support ${fillMode} fill mode`, () => {
        const component = renderer.create(
            <WaffleHtml
                width={400}
                height={400}
                rows={10}
                columns={10}
                total={100}
                data={[{ id: 'one', label: 'one', value: 10 }]}
                fillDirection={fillMode}
            />
        )

        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
}
