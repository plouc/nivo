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
    useControl({
        id: 'angle',
        type: 'angle',
        value: 12,
    })

    const genericsInitial = useMemo(
        () => ({
            theme: 'dark',
            enabled: true,
            size: 12,
            label: 'Hello world',
            number_radio: 3,
        }),
        []
    )
    const generics = useControl<'object', typeof genericsInitial>({
        id: 'generics',
        label: 'Generics',
        type: 'object',
        icon: 'sliders',
        value: genericsInitial,
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

    const specializedInitial = useMemo(
        () => ({
            angle: 180,
            anchor: 'center' as const,
            lineWidth: 2,
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
        }),
        []
    )
    const specialized = useControl<'object', typeof specializedInitial>({
        id: 'specialized',
        label: 'Specialized',
        type: 'object',
        icon: 'hash',
        value: specializedInitial,
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
            {
                id: 'margin',
                type: 'margin',
            },
        ],
    })

    const colorsInitial = useMemo(
        () => ({
            accentColor: '#483c14',
            opacity: 0.35,
            ordinalColors: 'nivo',
            blendMode: 'normal' as const,
            nested: {
                opacity: 1,
            },
        }),
        []
    )
    const colors = useControl<'object', typeof colorsInitial>({
        id: 'colors',
        label: 'Colors',
        type: 'object',
        icon: 'image',
        value: colorsInitial,
        props: [
            {
                id: 'accentColor',
                type: 'color',
            },
            {
                id: 'ordinalColors',
                type: 'ordinal_colors',
            },
            {
                id: 'blendMode',
                type: 'blend_mode',
            },
            {
                id: 'nested',
                type: 'object',
                props: [
                    {
                        id: 'opaciy',
                        type: 'text',
                    },
                ],
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
