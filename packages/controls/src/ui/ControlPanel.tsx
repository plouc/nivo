import { ThemeProvider, DefaultTheme } from 'styled-components'
import { ControlProps } from '../types'
import { Control } from '../Control'
import { Panel } from './Panel'

interface ControlPanelProps {
    controls: ControlProps[]
    theme: DefaultTheme
}

export const ControlPanel = ({ controls, theme }: ControlPanelProps) => {
    return (
        <ThemeProvider theme={theme}>
            <Panel>
                {controls.map(control => (
                    <Control key={control.id} control={control} />
                ))}
            </Panel>
        </ThemeProvider>
    )
}
