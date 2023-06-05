import { scaleSequential, scaleThreshold } from 'd3-scale'

// characteristics of the linear scale
const thresholds = [0, 0.4, 0.5, 0.6, 1]

// array of sequential scales
const colors = ['#8888ee', '#ffffee', '#eebb00', '#ffeeff', '#dd8888']
const scales = thresholds.slice(0, thresholds.length - 1).map((v, i) =>
    scaleSequential<string>()
        .domain(thresholds.slice(i, i + 2))
        .range(colors.slice(i, i + 2))
)

// mapper that will look at a value and pick one of the scales
const getScaleIndex = scaleThreshold()
    .domain(thresholds)
    .range(
        Array(thresholds.length)
            .fill(0)
            .map((v, i) => i - 1)
    )

export const customInterpolator = (t: number) => scales[getScaleIndex(t)](t)
