import { Annotation, useAnnotations } from '@nivo/annotations'
import { BoxPlotAnnotationsProps } from './types'

export const BoxPlotAnnotations = ({ boxPlots, annotations }: BoxPlotAnnotationsProps) => {
    const boundAnnotations = useAnnotations({
        data: boxPlots,
        annotations,
        getPosition: boxPlot => ({
            x: boxPlot.x + boxPlot.width / 2,
            y: boxPlot.y + boxPlot.height / 2,
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
