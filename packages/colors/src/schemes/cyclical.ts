import { interpolateRainbow, interpolateSinebow } from 'd3-scale-chromatic'

export const cyclicalColorInterpolators = {
    rainbow: interpolateRainbow,
    sinebow: interpolateSinebow,
}

export type CyclicalColorInterpolatorId = keyof typeof cyclicalColorInterpolators
