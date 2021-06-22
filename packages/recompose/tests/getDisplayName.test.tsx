import { Component } from 'react'
import { getDisplayName } from '../src'

test('getDisplayName gets the display name of a React component', () => {
    class SomeComponent extends Component {
        render() {
            return <div />
        }
    }

    class SomeOtherComponent extends Component {
        static displayName = 'CustomDisplayName'
        render() {
            return <div />
        }
    }

    function YetAnotherComponent() {
        return <div />
    }

    expect(getDisplayName(SomeComponent)).toBe('SomeComponent')
    expect(getDisplayName(SomeOtherComponent)).toBe('CustomDisplayName')
    expect(getDisplayName(YetAnotherComponent)).toBe('YetAnotherComponent')
    expect(getDisplayName(() => <div />)).toBe('Component')
    expect(getDisplayName('div')).toBe('div')
})
