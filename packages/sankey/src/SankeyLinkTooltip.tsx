import { BasicTooltip, Chip } from '@nivo/tooltip'
import { SankeyId, SankeyLinkDatum } from './types'

const tooltipStyles = {
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    sourceChip: {
        marginRight: 7,
    },
    targetChip: {
        marginLeft: 7,
        marginRight: 7,
    },
}

export interface SankeyLinkTooltipProps<Id extends SankeyId> {
    link: SankeyLinkDatum<Id>
}

export const SankeyLinkTooltip = <Id extends SankeyId>({ link }: SankeyLinkTooltipProps<Id>) => (
    <BasicTooltip
        id={
            <span style={tooltipStyles.container}>
                <Chip color={link.source.color} style={tooltipStyles.sourceChip} />
                <strong>{link.source.label}</strong>
                {' > '}
                <strong>{link.target.label}</strong>
                <Chip color={link.target.color} style={tooltipStyles.targetChip} />
                <strong>{link.formattedValue}</strong>
            </span>
        }
    />
)
