import * as React from 'react'
import { shallow } from 'enzyme'
import { withProps } from '../src'

test('withProps passes additional props to base component', () => {
    // @ts-expect-error types need improving
    const DoReMi = withProps({ 'data-so': 'do', 'data-la': 'fa' })('div')
    expect(DoReMi.displayName).toBe('withProps(div)')

    const div = shallow(<DoReMi />).find('div')
    expect(div.prop('data-so')).toBe('do')
    expect(div.prop('data-la')).toBe('fa')
})

test('withProps takes precedent over owner props', () => {
    // @ts-expect-error types need improving
    const DoReMi = withProps({ 'data-so': 'do', 'data-la': 'fa' })('div')

    const div = shallow(<DoReMi data-la="ti" />).find('div')
    expect(div.prop('data-so')).toBe('do')
    expect(div.prop('data-la')).toBe('fa')
})

test('withProps should accept function', () => {
    const DoReMi = withProps(props => ({
        // @ts-expect-error types need improving
        'data-so': props['data-la'],
        // @ts-expect-error types need improving
    }))('div')

    const div = shallow(<DoReMi data-la="la" />).find('div')
    expect(div.prop('data-so')).toBe('la')
})
