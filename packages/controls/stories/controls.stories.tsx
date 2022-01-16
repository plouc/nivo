import { useMemo } from 'react'
import { storiesOf } from '@storybook/react'
import styled, { ThemeProvider } from 'styled-components'
import {
    useControl,
    ControlPanel,
    TabbedControlPanel,
    darkTheme,
    // lightTheme,
    // yellowTheme,
    // @ts-ignore
} from '../src'

const stories = storiesOf('Controls', module)

stories.add('Range', () => {
    const generics = useControl({
        id: 'generics',
        label: 'Generics',
        type: 'object',
        icon: 'sliders',
        value: {
            theme: 'dark',
            enabled: true,
            size: 12,
            label: 'Hello world',
            number_radio: 3,
        },
        props: [
            {
                id: 'enabled',
                type: 'switch',
                help: 'Enable/Disable the feature.',
            },
            {
                id: 'size',
                type: 'range',
                help: 'Control the size of the element.',
                min: 0,
                max: 100,
                unit: 'px',
            },
            {
                id: 'theme',
                type: 'radio',
                choices: [
                    { value: 'dark', label: 'Dark' },
                    { value: 'light', label: 'Light' },
                ],
            },
            {
                id: 'label',
                type: 'text',
                icon: 'type',
                help: 'Define the label of the legend.',
            },
            {
                id: 'number_radio',
                type: 'radio',
                columns: 3,
                choices: [
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                    { value: 3, label: 'Three' },
                ],
            },
        ],
    })

    const specialized = useControl({
        id: 'specialized',
        label: 'Specialized',
        type: 'object',
        icon: 'hash',
        value: {
            angle: 180,
            anchor: 'center',
            lineWidth: 2,
        },
        props: [
            {
                id: 'angle',
                type: 'angle',
            },
            {
                id: 'anchor',
                type: 'box_anchor',
            },
            {
                id: 'lineWidth',
                type: 'line_width',
            },
        ],
    })

    const colors = useControl({
        id: 'colors',
        label: 'Colors',
        type: 'object',
        icon: 'image',
        value: {
            accentColor: '#FF0000',
            opacity: 0.35,
            ordinalColors: 'nivo',
        },
        props: [
            {
                id: 'accentColor',
                type: 'color',
            },
            {
                id: 'opacity',
                type: 'opacity',
            },
            {
                id: 'ordinalColors',
                type: 'ordinal_colors',
            },
        ],
    })

    const mergedValue = useMemo(
        () => ({
            ...generics.value,
            ...specialized.value,
            ...colors.value,
        }),
        [generics.value, specialized.value, colors.value]
    )

    return (
        <ThemeProvider theme={darkTheme}>
            <Container>
                <TabbedControlPanel
                    tabs={[
                        {
                            name: 'Generics',
                            controls: [generics],
                        },
                        {
                            name: 'Specialized',
                            controls: [specialized],
                        },
                        {
                            name: 'Colors',
                            controls: [colors],
                        },
                    ]}
                />
                <ControlPanel controls={[generics]} />
                <ControlPanel controls={[specialized]} />
                <ControlPanel controls={[colors]} />
                <div>
                    <pre>{JSON.stringify(mergedValue, null, '  ')}</pre>
                </div>
            </Container>
        </ThemeProvider>
    )
})

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 280px);
    grid-column-gap: 16px;
    padding: 32px;
    align-items: flex-start;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
`
