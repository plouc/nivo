import { BulletTooltipProps } from './types'
import { BasicTooltip } from '@bitbloom/nivo-tooltip'

export const BulletTooltip = ({ color, v0, v1 }: BulletTooltipProps) => {
    return (
        <BasicTooltip
            id={
                v1 ? (
                    <span>
                        <strong>{v0}</strong> to <strong>{v1}</strong>
                    </span>
                ) : (
                    <strong>{v0}</strong>
                )
            }
            enableChip={true}
            color={color}
        />
    )
}
