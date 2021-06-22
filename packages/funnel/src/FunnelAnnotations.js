import { Annotation } from '@nivo/annotations'
import { useFunnelAnnotations } from './hooks'

export const FunnelAnnotations = ({ parts, annotations }) => {
    const boundAnnotations = useFunnelAnnotations(parts, annotations)

    return boundAnnotations.map((annotation, i) => <Annotation key={i} {...annotation} />)
}

FunnelAnnotations.propTypes = {}
