import { BasicTooltip, Chip } from '@nivo/tooltip'
import { DefaultLink, DefaultNode, SankeyLinkDatum } from './types'

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

export interface SankeyLinkTooltipProps<N extends DefaultNode, L extends DefaultLink> {
    link: SankeyLinkDatum<N, L>
}

export const SankeyLinkTooltip = <N extends DefaultNode, L extends DefaultLink>({
    link,
}: SankeyLinkTooltipProps<N, L>) => (
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
