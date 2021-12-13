import { WaffleGridAxisDataX, WaffleGridAxisDataY } from './types'
import { WaffleGridAxisX } from './WaffleGridAxisX'
import { WaffleGridAxisY } from './WaffleGridAxisY'

export const WaffleGridAxes = ({
    xAxis,
    yAxis,
}: {
    xAxis: WaffleGridAxisDataX
    yAxis: WaffleGridAxisDataY
}) => {
    return (
        <>
            <WaffleGridAxisX axis={xAxis} />
            <WaffleGridAxisY axis={yAxis} />
        </>
    )
}
