import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
// @ts-ignore
import { BoxAnchorControl, darkTheme } from '../src'

describe('BoxAnchorControl', () => {
    it('should render a box anchor control', () => {
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <BoxAnchorControl
                    id="boxAnchor"
                    type="box_anchor"
                    value="center"
                    onChange={() => {}}
                />
            </ThemeProvider>
        )

        expect(wrapper.text()).toContain('center')
    })

    it('should call onChange callback when a new anchor is clicked', () => {
        const onChange = jest.fn()
        const wrapper = mount(
            <ThemeProvider theme={darkTheme}>
                <BoxAnchorControl
                    id="boxAnchor"
                    type="box_anchor"
                    value="center"
                    onChange={onChange}
                />
            </ThemeProvider>
        )

        const topRightButton = wrapper.find(`[data-testid='anchor.top-right']`)
        topRightButton.simulate('click')

        expect(onChange).toHaveBeenCalledTimes(1)
        const [value] = onChange.mock.calls[0]
        expect(value).toEqual('top-right')
    })
})
