import * as React from 'react'
import * as PropTypes from 'prop-types'
import { setPropTypes } from '../src'

test('setPropTypes sets a static property on the base component', () => {
    const BaseComponent: React.ComponentType = () => <div />
    const NewComponent = setPropTypes({ foo: PropTypes.object })(BaseComponent)

    expect(NewComponent.propTypes).toEqual({
        foo: PropTypes.object,
    })
})
