import { useState } from 'react'
import type { Meta } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { RangeControl, controlsDefaultTheme } from '@nivo/controls'

const meta: Meta = {
    title: 'controls/RangeControl',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        Story => (
            <ThemeProvider theme={controlsDefaultTheme}>
                <Story />
            </ThemeProvider>
        ),
    ],
}

export default meta

export const Minimal = () => {
    const [value, setValue] = useState(0.5)

    return (
        <RangeControl
            property={{
                name: 'value',
                type: 'number',
                help: 'A numeric value.',
                control: {
                    type: 'range',
                },
            }}
            value={value}
            onChange={setValue}
        />
    )
}
