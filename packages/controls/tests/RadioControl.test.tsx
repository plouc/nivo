import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
// @ts-ignore
import { RadioControl, darkTheme } from '../src'

const choices = [
    {
        label: 'Option A',
        value: 'option_a',
    },
    {
        label: 'Option B',
        value: 'option_b',
    },
    {
        label: 'Option C',
        value: 'option_c',
    },
]

describe('RadioControl', () => {
    it('should render a radio control', () => {
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <RadioControl
                    id="radio"
                    type="radio"
                    choices={choices}
                    value="option_b"
                    onChange={() => {}}
                />
            </ThemeProvider>
        )

        const checkboxInput = wrapper.find(`input[value='option_b']`)
        expect(checkboxInput.exists()).toBeTruthy()
        expect(checkboxInput.prop('checked')).toBe(true)
    })

    it('should call onChange callback when a radio is updated', () => {
        const onChange = jest.fn()
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <RadioControl
                    id="radio"
                    type="radio"
                    choices={choices}
                    value="option_b"
                    onChange={onChange}
                />
            </ThemeProvider>
        )

        const radioInput = wrapper.find('label').at(2).find('input')
        radioInput.simulate('change', { target: { value: choices[2].value } })

        expect(onChange).toHaveBeenCalledTimes(1)
        const [value] = onChange.mock.calls[0]
        expect(value).toEqual(choices[2].value)
    })
})
