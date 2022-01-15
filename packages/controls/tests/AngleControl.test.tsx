import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
// @ts-ignore
import { AngleControl, darkTheme } from '../src'

describe('AngleControl', () => {
    it('should render an angle control', () => {
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <AngleControl name="angle" type="angle" value={90} />
            </ThemeProvider>
        )

        const rangeInput = wrapper.find(`input[type='range']`)
        expect(rangeInput.exists()).toBeTruthy()
        expect(rangeInput.prop('min')).toBe(0)
        expect(rangeInput.prop('max')).toBe(360)
        expect(rangeInput.prop('value')).toBe(90)

        const textInput = wrapper.find(`input[type='text']`)
        expect(textInput.exists()).toBeTruthy()
        expect(textInput.prop('value')).toBe(90)

        const preview = wrapper.find('svg > g > g')
        expect(preview.prop('transform')).toEqual('rotate(90)')
    })

    it('should call onChange callback when the range input is updated', () => {
        const onChange = jest.fn()
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <AngleControl name="angle" type="angle" value={90} onChange={onChange} />
            </ThemeProvider>
        )

        const rangeInput = wrapper.find(`input[type='range']`)
        rangeInput.simulate('change', { target: { value: 180 } })

        expect(onChange).toHaveBeenCalledTimes(1)
        const [value] = onChange.mock.calls[0]
        expect(value).toEqual(180)
    })

    it('should call onChange callback when the text input is updated', () => {
        const onChange = jest.fn()
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <AngleControl name="angle" type="angle" value={90} onChange={onChange} />
            </ThemeProvider>
        )

        const textInput = wrapper.find(`input[type='text']`)
        textInput.simulate('change', { target: { value: '180' } })

        expect(onChange).toHaveBeenCalledTimes(1)
        const [value] = onChange.mock.calls[0]
        expect(value).toEqual(180)
    })
})
