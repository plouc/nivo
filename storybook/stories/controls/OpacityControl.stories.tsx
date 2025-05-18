import { useState } from 'react'
import type { Meta } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { OpacityControl, controlsDefaultTheme } from '@nivo/controls'

const meta: Meta = {
    title: 'controls/OpacityControl',
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
        <OpacityControl
            property={{
                name: 'opacity',
                type: 'number',
                help: 'Control the opacity of an element.',
                control: {
                    type: 'opacity',
                },
            }}
            context={{
                flavors: ['svg', 'canvas', 'html'],
                currentFlavor: 'svg',
                path: [],
            }}
            value={value}
            onChange={setValue}
        />
    )
}
