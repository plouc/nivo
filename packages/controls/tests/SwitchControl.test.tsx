import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
// @ts-ignore
import { SwitchControl, darkTheme } from '../src'

describe('SwitchControl', () => {
    it('should render a range control', () => {
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <SwitchControl id="switch" type="switch" value={true} />
            </ThemeProvider>
        )

        const checkboxInput = wrapper.find(`input[type='checkbox']`)
        expect(checkboxInput.exists()).toBeTruthy()
        expect(checkboxInput.prop('checked')).toBe(true)
    })

    it('should call onChange callback when the checkbox is updated', () => {
        const onChange = jest.fn()
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <SwitchControl id="switch" type="switch" value={true} onChange={onChange} />
            </ThemeProvider>
        )

        const checkboxInput = wrapper.find(`input[type='checkbox']`)
        checkboxInput.simulate('change', { target: { checked: false } })

        expect(onChange).toHaveBeenCalledTimes(1)
        const [value] = onChange.mock.calls[0]
        expect(value).toEqual(false)
    })
})
