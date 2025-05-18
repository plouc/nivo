import { useState } from 'react'
import type { Meta } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { TextControl, controlsDefaultTheme } from '@nivo/controls'

const meta: Meta = {
    title: 'controls/TextControl',
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
    const [value, setValue] = useState('Some text...')

    return (
        <TextControl
            property={{
                name: 'text',
                type: 'string',
                help: 'A text value.',
                control: {
                    type: 'text',
                },
            }}
            value={value}
            onChange={setValue}
        />
    )
}
