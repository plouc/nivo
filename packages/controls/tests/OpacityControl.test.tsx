import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
// @ts-ignore
import { OpacityControl, darkTheme } from '../src'

describe('OpacityControl', () => {
    it('should render an opacity control', () => {
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <OpacityControl id="opacity" type="opacity" value={0.5} onChange={() => {}} />
            </ThemeProvider>
        )

        const rangeInput = wrapper.find(`input[type='range']`)
        expect(rangeInput.exists()).toBeTruthy()
        expect(rangeInput.prop('min')).toBe(0)
        expect(rangeInput.prop('max')).toBe(1)
        expect(rangeInput.prop('value')).toBe(0.5)

        const textInput = wrapper.find(`input[type='text']`)
        expect(textInput.exists()).toBeTruthy()
        expect(textInput.prop('value')).toBe(0.5)

        const preview = wrapper.find('svg > rect').at(1)
        expect(preview.prop('fillOpacity')).toEqual(0.5)
    })

    it('should call onChange callback when the range input is updated', () => {
        const onChange = jest.fn()
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <OpacityControl id="opacity" type="opacity" value={0.5} onChange={onChange} />
            </ThemeProvider>
        )

        const rangeInput = wrapper.find(`input[type='range']`)
        rangeInput.simulate('change', { target: { value: 0.35 } })

        expect(onChange).toHaveBeenCalledTimes(1)
        const [value] = onChange.mock.calls[0]
        expect(value).toEqual(0.35)
    })

    it('should call onChange callback when the text input is updated', () => {
        const onChange = jest.fn()
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <OpacityControl id="opacity" type="opacity" value={0.5} onChange={onChange} />
            </ThemeProvider>
        )

        const textInput = wrapper.find(`input[type='text']`)
        textInput.simulate('change', { target: { value: '0.35' } })

        expect(onChange).toHaveBeenCalledTimes(1)
        const [value] = onChange.mock.calls[0]
        expect(value).toEqual(0.35)
    })
})
