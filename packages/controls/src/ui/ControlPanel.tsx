import { ControlProps } from '../types'
import { Control } from '../Control'
import { Panel } from './Panel'

interface ControlPanelProps {
    controls: ControlProps[]
}

export const ControlPanel = ({ controls }: ControlPanelProps) => (
    <Panel>
        {controls.map(control => (
            <Control key={control.id} control={control} />
        ))}
    </Panel>
)
