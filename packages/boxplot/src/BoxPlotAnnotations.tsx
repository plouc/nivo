import { Annotation, useAnnotations } from '@nivo/annotations'
import { BoxPlotAnnotationsProps, ComputedBoxPlotSummary } from './types'

const getPosition = (boxPlot: ComputedBoxPlotSummary) => ({
    x: boxPlot.x + boxPlot.width / 2,
    y: boxPlot.y + boxPlot.height / 2,
})

const getDimensions = ({ width, height }: { width: number; height: number }) => ({
    width,
    height,
    size: Math.max(width, height),
})

export const BoxPlotAnnotations = ({ boxPlots, annotations }: BoxPlotAnnotationsProps) => {
    const boundAnnotations = useAnnotations({
        data: boxPlots,
        annotations,
        getPosition,
        getDimensions,
    })

    return (
        <>
            {boundAnnotations.map((annotation, i) => (
                <Annotation key={i} {...annotation} />
            ))}
        </>
    )
}
