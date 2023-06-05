import { PartLabel } from './PartLabel'
import { FunnelDatum, FunnelPart } from './types'

interface PartLabelsProps<D extends FunnelDatum> {
    parts: FunnelPart<D>[]
}

export const PartLabels = <D extends FunnelDatum>({ parts }: PartLabelsProps<D>) => (
    <>
        {parts.map(part => (
            <PartLabel key={part.data.id} part={part} />
        ))}
    </>
)
