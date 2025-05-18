import { Annotation, useAnnotations } from '@nivo/annotations'
import { BarAnnotationsProps, BarDatum } from './types'

export const BarAnnotations = <D extends BarDatum>({
    bars,
    annotations,
}: BarAnnotationsProps<D>) => {
    const boundAnnotations = useAnnotations({
        data: bars,
        annotations,
        getPosition: bar => ({
            x: bar.x + bar.width / 2,
            y: bar.y + bar.height / 2,
        }),
        getDimensions: ({ height, width }) => ({
            width,
            height,
            size: Math.max(width, height),
        }),
    })

    return (
        <>
            {boundAnnotations.map((annotation, i) => (
                <Annotation key={i} {...annotation} />
            ))}
        </>
    )
}
