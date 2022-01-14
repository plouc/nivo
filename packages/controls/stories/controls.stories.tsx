import { storiesOf } from '@storybook/react'
import styled, { ThemeProvider } from 'styled-components'
// @ts-ignore
import { useControl, Control } from '../src'
import { useMemo } from 'react'

const stories = storiesOf('Controls', module)

const theme = {
    colors: {
        cardBackground: '#2f3333',
        text: '#b6c4c4',
        textLight: '#727a7a',
        inputBackground: '#1e2121',
        border: '#1e2121',
        borderLight: '#1e2121',
        accent: '#4c9d9d',
    },
}

const genericControls = [
    {
        name: 'enabled',
        type: 'switch',
        help: 'Enable/Disable the feature.',
    },
    {
        name: 'size',
        type: 'range',
        help: 'Control the size of the element.',
        min: 0,
        max: 100,
        unit: 'px',
    },
    {
        name: 'layout',
        type: 'radio',
        choices: [
            { value: 'horizontal', label: 'Horizontal' },
            { value: 'vertical', label: 'Vertical' },
        ],
    },
    {
        name: 'label',
        type: 'text',
        help: 'Define the label of the legend.',
    },
    {
        name: 'number_radio',
        type: 'radio',
        columns: 3,
        choices: [
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
            { value: 3, label: 'Three' },
        ],
    },
]

const specializedControls = [
    {
        name: 'angle',
        type: 'angle',
    },
    {
        name: 'anchor',
        type: 'box_anchor',
    },
    {
        name: 'lineWidth',
        type: 'line_width',
    },
]

const colorControls = [
    {
        name: 'color',
        type: 'color',
    },
    {
        name: 'opacity',
        type: 'opacity',
    },
]

stories.add('Range', () => {
    const generics = useControl({
        name: 'Generics',
        type: 'object',
        value: {
            enabled: true,
            size: 12,
            layout: 'horizontal',
            label: 'Hello world',
            number_radio: 3,
        },
        props: genericControls,
    })

    const specialized = useControl({
        name: 'Specialized',
        type: 'object',
        value: {
            angle: 180,
            anchor: 'center',
            lineWidth: 2,
        },
        props: specializedControls,
    })

    const colors = useControl({
        name: 'Colors',
        type: 'object',
        value: {
            color: '#d7ae44',
            opacity: 0.35,
        },
        props: colorControls,
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
        <ThemeProvider theme={theme}>
            <Container>
                <div>
                    <Control control={generics} />
                </div>
                <div>
                    <Control control={specialized} />
                </div>
                <div>
                    <Control control={colors} />
                </div>
                <div>
                    <pre>{JSON.stringify(mergedValue, null, '  ')}</pre>
                </div>
            </Container>
        </ThemeProvider>
    )
})

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 280px);
    grid-column-gap: 16px;
`
