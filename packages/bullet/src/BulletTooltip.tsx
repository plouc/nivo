import { BasicTooltip } from '@nivo/tooltip'
import { BulletTooltipComponent } from './types'

export const BulletTooltip: BulletTooltipComponent = ({ node }) => {
    return (
        <BasicTooltip
            id={node.id}
            value={node.value.formattedValue}
            enableChip={true}
            color={node.color}
        />
    )
}
