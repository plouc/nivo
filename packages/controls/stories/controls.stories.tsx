import { storiesOf } from '@storybook/react'
import styled, { ThemeProvider } from 'styled-components'
// @ts-ignore
import { useControl, ControlPanel, TabbedControlPanel, darkTheme, lightTheme } from '../src'
import { useMemo, useState } from 'react'

const stories = storiesOf('Controls', module)

const Demo = ({
    theme,
    setTheme,
    accentColor,
    setAccentColor,
}: {
    theme: string
    setTheme: (theme: string) => void
    accentColor: string
    setAccentColor: (color: string) => void
}) => {
    const generics = useControl({
        id: 'generics',
        label: 'Generics',
        type: 'object',
        icon: 'sliders',
        value: {
            theme,
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
        onChange: value => {
            setTheme(value.theme)
        },
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
            accentColor,
            opacity: 0.35,
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
        ],
        onChange: value => {
            setAccentColor(value.accentColor)
        },
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
    )
}

stories.add('Range', () => {
    const [themeId, setThemeId] = useState('dark')
    const [accentColor, setAccentColor] = useState(darkTheme.colors.accent)

    const theme = useMemo(() => {
        const _theme = themeId === 'dark' ? darkTheme : lightTheme

        return {
            ..._theme,
            colors: {
                ..._theme.colors,
                accent: accentColor,
            },
        }
    }, [themeId, accentColor])

    return (
        <ThemeProvider theme={theme}>
            <Demo
                theme={themeId}
                setTheme={setThemeId}
                accentColor={accentColor}
                setAccentColor={setAccentColor}
            />
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
