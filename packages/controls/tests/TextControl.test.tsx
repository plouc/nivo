import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
// @ts-ignore
import { TextControl, darkTheme } from '../src'

describe('TextControl', () => {
    it('should render a text control', () => {
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <TextControl id="text" type="text" value="test" />
            </ThemeProvider>
        )

        const textInput = wrapper.find(`input[type='text']`)
        expect(textInput.exists()).toBeTruthy()
        expect(textInput.prop('value')).toBe('test')
    })

    it('should call onChange callback when the text input is updated', () => {
        const onChange = jest.fn()
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <TextControl id="text" type="text" value="test" onChange={onChange} />
            </ThemeProvider>
        )

        const textInput = wrapper.find(`input[type='text']`)
        textInput.simulate('change', { target: { value: 'update' } })

        expect(onChange).toHaveBeenCalledTimes(1)
        const [value] = onChange.mock.calls[0]
        expect(value).toEqual('update')
    })
})
