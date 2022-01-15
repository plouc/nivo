import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
// @ts-ignore
import { RangeControl, darkTheme } from '../src'

describe('RangeControl', () => {
    it('should render a range control', () => {
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <RangeControl id="range" type="range" min={0} max={10} value={5} />
            </ThemeProvider>
        )

        const rangeInput = wrapper.find(`input[type='range']`)
        expect(rangeInput.exists()).toBeTruthy()
        expect(rangeInput.prop('min')).toBe(0)
        expect(rangeInput.prop('max')).toBe(10)
        expect(rangeInput.prop('value')).toBe(5)

        const textInput = wrapper.find(`input[type='text']`)
        expect(textInput.exists()).toBeTruthy()
        expect(textInput.prop('value')).toBe(5)
    })

    it('should call onChange callback when the range input is updated', () => {
        const onChange = jest.fn()
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <RangeControl
                    id="range"
                    type="range"
                    min={0}
                    max={10}
                    value={5}
                    onChange={onChange}
                />
            </ThemeProvider>
        )

        const rangeInput = wrapper.find(`input[type='range']`)
        rangeInput.simulate('change', { target: { value: 9 } })

        expect(onChange).toHaveBeenCalledTimes(1)
        const [value] = onChange.mock.calls[0]
        expect(value).toEqual(9)
    })

    it('should call onChange callback when the text input is updated', () => {
        const onChange = jest.fn()
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <RangeControl
                    id="range"
                    type="range"
                    min={0}
                    max={10}
                    value={5}
                    onChange={onChange}
                />
            </ThemeProvider>
        )

        const textInput = wrapper.find(`input[type='text']`)
        textInput.simulate('change', { target: { value: '3' } })

        expect(onChange).toHaveBeenCalledTimes(1)
        const [value] = onChange.mock.calls[0]
        expect(value).toEqual(3)
    })
})
