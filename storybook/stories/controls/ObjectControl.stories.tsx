import { useState } from 'react'
import type { Meta } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { ObjectControl, controlsDefaultTheme } from '@nivo/controls'

const meta: Meta = {
    title: 'controls/ObjectControl',
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
    const [value, setValue] = useState<Record<string, unknown>>({
        isEnabled: true,
        opacity: 0.5,
        padding: 10,
    })

    return (
        <ObjectControl
            property={{
                name: 'object',
                type: 'object',
                help: 'Control several nested properties.',
                control: {
                    type: 'object',
                    isOpenedByDefault: true,
                    props: [
                        {
                            name: 'isEnabled',
                            required: true,
                            type: 'boolean',
                            control: {
                                type: 'switch',
                            },
                        },
                        {
                            name: 'opacity',
                            type: 'number',
                            control: {
                                type: 'opacity',
                            },
                        },
                        {
                            name: 'padding',
                            required: true,
                            type: 'number',
                            control: {
                                type: 'range',
                                units: 'px',
                            },
                        },
                    ],
                },
            }}
            value={value}
            onChange={setValue}
        />
    )
}
