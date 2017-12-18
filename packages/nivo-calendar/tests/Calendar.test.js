import React from 'react'
import renderer from 'react-test-renderer'
import Calendar from '../src/Calendar'

it('should render a basic calendar chart', () => {
    const component = renderer.create(
        <Calendar
            width={800}
            height={600}
            data={[
                {
                    day: '2015-03-15',
                    value: 263,
                },
            ]}
            from="2015-01-01"
            to="2015-12-31"
        />
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
