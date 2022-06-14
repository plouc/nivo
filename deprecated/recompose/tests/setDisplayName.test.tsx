import * as React from 'react'
import { setDisplayName } from '../src'

test('setDisplayName sets a static property on the base component', () => {
    const BaseComponent: React.ComponentType = () => <div />
    const NewComponent = setDisplayName('Foo')(BaseComponent)
    expect(NewComponent.displayName).toBe('Foo')
})
