import { storiesOf } from '@storybook/react'
import styled, { ThemeProvider } from 'styled-components'
// @ts-ignore
import { useControl, ControlPanel, Control, darkTheme, lightTheme } from '../src'
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
        name: 'Generics',
        type: 'object',
        value: {
            theme,
            enabled: true,
            size: 12,
            label: 'Hello world',
            number_radio: 3,
        },
        props: [
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
                name: 'theme',
                type: 'radio',
                choices: [
                    { value: 'dark', label: 'Dark' },
                    { value: 'light', label: 'Light' },
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
        ],
        onChange: value => {
            setTheme(value.theme)
        },
    })

    const specialized = useControl({
        name: 'Specialized',
        type: 'object',
        value: {
            angle: 180,
            anchor: 'center',
            lineWidth: 2,
        },
        props: [
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
        ],
    })

    const colors = useControl({
        name: 'Colors',
        type: 'object',
        value: {
            accentColor,
            opacity: 0.35,
        },
        props: [
            {
                name: 'accentColor',
                type: 'color',
            },
            {
                name: 'opacity',
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
            <ControlPanel>
                <Control control={generics} />
            </ControlPanel>
            <ControlPanel>
                <Control control={specialized} />
            </ControlPanel>
            <ControlPanel>
                <Control control={colors} />
            </ControlPanel>
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
    grid-template-columns: repeat(4, 280px);
    grid-column-gap: 16px;
    padding: 32px;
    align-items: flex-start;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
`
