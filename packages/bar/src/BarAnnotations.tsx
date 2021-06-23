import { Annotation, useAnnotations } from '@nivo/annotations'
import { BarAnnotationsProps } from './types'

export const BarAnnotations = <RawDatum,>({ bars, annotations }: BarAnnotationsProps<RawDatum>) => {
    const boundAnnotations = useAnnotations({
        data: bars,
        annotations,
        getPosition: bar => ({
            x: bar.x + bar.width / 2,
            y: bar.y + bar.height / 2,
        }),
        getDimensions: bar => {
            const width = bar.width
            const height = bar.height

            return {
                width,
                height,
                size: Math.max(width, height),
            }
        },
    })

    return (
        <>
            {boundAnnotations.map((annotation, i) => (
                <Annotation key={i} {...annotation} />
            ))}
        </>
    )
}
