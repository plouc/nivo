import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
// @ts-ignore
import { ColorControl, darkTheme } from '../src'

describe('ColorControl', () => {
    it('should render a color control', () => {
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <ColorControl id="color" type="color" value="#ff0000" onChange={() => {}} />
            </ThemeProvider>
        )

        const textInput = wrapper.find(`input[type='color']`)
        expect(textInput.exists()).toBeTruthy()
        expect(textInput.prop('value')).toBe('#ff0000')
    })

    it('should call onChange callback when the input is updated', () => {
        const onChange = jest.fn()
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <ColorControl id="color" type="color" value="test" onChange={onChange} />
            </ThemeProvider>
        )

        const textInput = wrapper.find(`input[type='color']`)
        textInput.simulate('change', { target: { value: '#0000ff' } })

        expect(onChange).toHaveBeenCalledTimes(1)
        const [value] = onChange.mock.calls[0]
        expect(value).toEqual('#0000ff')
    })
})
