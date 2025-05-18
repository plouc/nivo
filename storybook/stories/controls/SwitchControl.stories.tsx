import { useState } from 'react'
import type { Meta } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { SwitchControl, controlsDefaultTheme } from '@nivo/controls'

const meta: Meta = {
    title: 'controls/SwitchControl',
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

export const Switch = () => {
    const [value, setValue] = useState(true)

    return (
        <SwitchControl
            property={{
                name: 'enable',
                type: 'boolean',
                help: 'A boolean value.',
                control: {
                    type: 'switch',
                },
            }}
            value={value}
            onChange={setValue}
        />
    )
}
