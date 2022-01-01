import { to, SpringValues } from '@react-spring/web'
import { arc as d3Arc } from 'd3-shape'
import { chord as d3Chord, ChordLayout, ribbon as d3Ribbon } from 'd3-chord'
import {
    ArcDatum,
    ChordCommonProps,
    ChordDataProps,
    RibbonAnimatedProps,
    RibbonDatum,
    RibbonGenerator,
    ArcGenerator,
    ArcAnimatedProps,
} from './types'
import { OrdinalColorScale } from '@nivo/colors'

export const computeChordLayout = ({ padAngle }: { padAngle: ChordCommonProps['padAngle'] }) =>
    d3Chord().padAngle(padAngle)

export const computeChordGenerators = ({
    width,
    height,
    innerRadiusRatio,
    innerRadiusOffset,
}: {
    width: number
    height: number
    innerRadiusRatio: ChordCommonProps['innerRadiusRatio']
    innerRadiusOffset: ChordCommonProps['innerRadiusOffset']
}) => {
    const center: [number, number] = [width / 2, height / 2]
    const radius = Math.min(width, height) / 2
    const innerRadius = radius * innerRadiusRatio
    const ribbonRadius = radius * (innerRadiusRatio - innerRadiusOffset)

    return {
        center,
        radius,
        innerRadius,
        arcGenerator: d3Arc()
            .outerRadius(radius)
            .innerRadius(innerRadius) as unknown as ArcGenerator,
        ribbonGenerator: d3Ribbon().radius(ribbonRadius) as unknown as RibbonGenerator,
    }
}

export const computeChordArcsAndRibbons = ({
    chord,
    data,
    keys,
    getLabel,
    formatValue,
    getColor,
}: {
    chord: ChordLayout
    data: ChordDataProps['data']
    keys: ChordDataProps['keys']
    getLabel: (arc: Omit<ArcDatum, 'label' | 'color'>) => string
    formatValue: (value: number) => string
    getColor: OrdinalColorScale<Omit<ArcDatum, 'label' | 'color'>>
}): {
    arcs: ArcDatum[]
    ribbons: RibbonDatum[]
} => {
    const _ribbons = chord(data)

    const arcs: ArcDatum[] = _ribbons.groups.map(chordGroup => {
        const arc: Omit<ArcDatum, 'label' | 'color'> = {
            ...chordGroup,
            id: keys[chordGroup.index],
            formattedValue: formatValue(chordGroup.value),
        }

        return {
            ...arc,
            label: getLabel(arc),
            color: getColor(arc),
        }
    })

    const ribbons: RibbonDatum[] = _ribbons.map(_ribbon => {
        const source = {
            ..._ribbon.source,
            id: keys[_ribbon.source.index],
            formattedValue: formatValue(_ribbon.source.value),
        }

        const target = {
            ..._ribbon.target,
            id: keys[_ribbon.target.index],
            formattedValue: formatValue(_ribbon.target.value),
        }

        return {
            ..._ribbon,
            // ensure id remains the same even if source/target are reversed
            id: [source.id, target.id].sort().join('.'),
            source: {
                ...source,
                label: getLabel(source),
                color: getColor(source),
            },
            target: {
                ...target,
                label: getLabel(target),
                color: getColor(target),
            },
        }
    })

    return { arcs, ribbons }
}

export const computeArcPath = ({
    startAngle,
    endAngle,
    arcGenerator,
}: SpringValues<Pick<ArcAnimatedProps, 'startAngle' | 'endAngle'>> & {
    arcGenerator: ArcGenerator
}) => to([startAngle, endAngle], (startAngle, endAngle) => arcGenerator({ startAngle, endAngle }))

export const computeRibbonPath = ({
    sourceStartAngle,
    sourceEndAngle,
    targetStartAngle,
    targetEndAngle,
    ribbonGenerator,
}: SpringValues<
    Pick<
        RibbonAnimatedProps,
        'sourceStartAngle' | 'sourceEndAngle' | 'targetStartAngle' | 'targetEndAngle'
    >
> & {
    ribbonGenerator: RibbonGenerator
}) =>
    to(
        [sourceStartAngle, sourceEndAngle, targetStartAngle, targetEndAngle],
        (sourceStartAngle, sourceEndAngle, targetStartAngle, targetEndAngle) =>
            ribbonGenerator({
                source: {
                    startAngle: Math.min(sourceStartAngle, sourceEndAngle),
                    endAngle: Math.max(sourceEndAngle, sourceStartAngle),
                },
                target: {
                    startAngle: Math.min(targetStartAngle, targetEndAngle),
                    endAngle: Math.max(targetEndAngle, targetStartAngle),
                },
            })
    )
