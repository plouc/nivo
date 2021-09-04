import { Annotation } from '@nivo/annotations'
import { useFunnelAnnotations } from './hooks'
import { FunnelDatum, FunnelPart } from './types'

interface FunnelAnnotationsProps<D extends FunnelDatum> {
    parts: FunnelPart<D>[]
    annotations: any[]
}

export const FunnelAnnotations = <D extends FunnelDatum>({
    parts,
    annotations,
}: FunnelAnnotationsProps<D>) => {
    const boundAnnotations = useFunnelAnnotations<D>(parts, annotations)

    return (
        <>
            {boundAnnotations.map((annotation, i) => (
                <Annotation key={i} {...annotation} />
            ))}
        </>
    )
}
