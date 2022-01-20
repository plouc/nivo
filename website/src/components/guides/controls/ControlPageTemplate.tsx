import React, { useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import dedent from 'dedent-js'
import { useControl, ControlPanel, darkTheme, lightTheme } from '@nivo/controls'
import media from '../../../theming/mediaQueries'
import { Highlight } from '../../Highlight'
import { ControlsLayout } from './ControlsLayout'
import { ControlTabs } from './ControlTabs'
import { ControlConfigTable, ControlConfigItem } from './ControlConfigTable'

interface ControlPageTemplateProps {
    name: string
    config: any
    props: ControlConfigItem[]
}

export const ControlPageTemplate = ({ name, config, props = [] }: ControlPageTemplateProps) => {
    const { id: themeId } = useTheme()
    const themeName = themeId === 'light' ? 'lightTheme' : 'darkTheme'
    const theme = useMemo(() => {
        if (themeId === 'light') return lightTheme
        return darkTheme
    }, [themeId])

    const [tab, setTab] = useState<'code' | 'config'>('config')

    const control = useControl(config)

    const configCode = useMemo(
        () =>
            dedent`const control = useControl(${JSON.stringify(config, null, '    ')})`
                .split('\n')
                .join('\n    ')
                .replace(/"([a-z]+)":/gi, (_, key: string) => `${key}:`)
                .replace(/"/g, `'`),
        [config]
    )

    const valueString = useMemo(
        () =>
            JSON.stringify(control.value, null, ' ')
                .replace(/\n/g, '')
                .replace(/"([a-z]+)":/gi, (_, key: string) => `${key}:`)
                .replace(/"/g, `'`),
        [control.value]
    )

    return (
        <ControlsLayout title={name}>
            <Container>
                <DemoContainer>
                    <ControlPanel controls={[control]} theme={theme} />
                </DemoContainer>
                <Content>
                    <ControlTabs tab={tab} setTab={setTab} />
                    {tab === 'code' && (
                        <Highlight
                            language="tsx"
                            code={dedent`
                        import { useControl, ControlPanel, ${themeName} } from '@nivo/controls'
                        
                        const ComponentWith${name} = () => {
                            ${configCode}
                            
                            console.log(control.value)
                            // > ${valueString}
                            
                            return (
                                <ControlPanel
                                    controls={[control]}
                                    theme={${themeName}}
                                />
                            )
                        }
                        `}
                        />
                    )}
                    {tab === 'config' && <ControlConfigTable config={props} />}
                </Content>
            </Container>
        </ControlsLayout>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 320px auto;
    grid-column-gap: 24px;

    ${media.tablet`
        & {
            grid-template-columns: 1fr;
            grid-row-gap: 16px;
        }
    `}

    ${media.mobile`
        & {
            grid-template-columns: 1fr;
            grid-row-gap: 16px;
        }
    `}
`

const DemoContainer = styled.div`
    font-size: 13px;
    max-width: 320px;

    ${media.mobile`
        & {
            max-width: unset;
            display: flex;
            justify-content: center;
            
            > div {
                width: 320px;
            }
        }
    `}
`

const Content = styled.div`
    background-color: ${({ theme }) => theme.colors.cardBackground};
    box-shadow: ${({ theme }) => theme.cardShadow};
    overflow: hidden;
`
