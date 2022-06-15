import * as React from 'react'
import * as PropTypes from 'prop-types'
import { setStatic } from '../src'

test('setStatic sets a static property on the base component', () => {
    const BaseComponent: React.ComponentType = () => <div />
    const NewComponent = setStatic('propTypes', { foo: PropTypes.object })(BaseComponent)

    expect(NewComponent.propTypes).toEqual({
        foo: PropTypes.object,
    })
})
