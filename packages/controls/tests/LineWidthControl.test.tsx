import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
// @ts-ignore
import { LineWidthControl, darkTheme } from '../src'

describe('LineWidthControl', () => {
    it('should render a line width control', () => {
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <LineWidthControl name="line_width" type="line_width" value={2} />
            </ThemeProvider>
        )

        const rangeInput = wrapper.find(`input[type='range']`)
        expect(rangeInput.exists()).toBeTruthy()
        expect(rangeInput.prop('min')).toBe(0)
        expect(rangeInput.prop('max')).toBe(20)
        expect(rangeInput.prop('value')).toBe(2)

        const textInput = wrapper.find(`input[type='text']`)
        expect(textInput.exists()).toBeTruthy()
        expect(textInput.prop('value')).toBe(2)

        const preview = wrapper.find('svg line').at(1)
        expect(preview.prop('strokeWidth')).toEqual(2)
    })

    it('should allow customization of the range input min/max and step', () => {
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <LineWidthControl
                    name="line_width"
                    type="line_width"
                    min={10}
                    max={50}
                    step={5}
                    value={15}
                />
            </ThemeProvider>
        )

        const rangeInput = wrapper.find(`input[type='range']`)
        expect(rangeInput.exists()).toBeTruthy()
        expect(rangeInput.prop('min')).toBe(10)
        expect(rangeInput.prop('max')).toBe(50)
        expect(rangeInput.prop('step')).toBe(5)
    })

    it('should call onChange callback when the range input is updated', () => {
        const onChange = jest.fn()
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <LineWidthControl
                    name="line_width"
                    type="line_width"
                    value={2}
                    onChange={onChange}
                />
            </ThemeProvider>
        )

        const rangeInput = wrapper.find(`input[type='range']`)
        rangeInput.simulate('change', { target: { value: 10 } })

        expect(onChange).toHaveBeenCalledTimes(1)
        const [value] = onChange.mock.calls[0]
        expect(value).toEqual(10)
    })

    it('should call onChange callback when the text input is updated', () => {
        const onChange = jest.fn()
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <LineWidthControl
                    name="line_width"
                    type="line_width"
                    value={2}
                    onChange={onChange}
                />
            </ThemeProvider>
        )

        const textInput = wrapper.find(`input[type='text']`)
        textInput.simulate('change', { target: { value: '10' } })

        expect(onChange).toHaveBeenCalledTimes(1)
        const [value] = onChange.mock.calls[0]
        expect(value).toEqual(10)
    })
})
