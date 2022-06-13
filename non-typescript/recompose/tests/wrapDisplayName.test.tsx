import { Component } from 'react'
import { wrapDisplayName } from '../src'

test('wrapDisplayName wraps the display name of a React component with the name of an HoC, Relay-style', () => {
    class SomeComponent extends Component {
        render() {
            return <div />
        }
    }

    expect(wrapDisplayName(SomeComponent, 'someHoC')).toBe('someHoC(SomeComponent)')
})
