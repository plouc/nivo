import { useMemo, useState } from 'react'
import {
    useValueFormatter,
    // @ts-ignore
    getLabelGenerator,
} from '@nivo/core'
import { OrdinalColorScale, useOrdinalColorScale } from '@nivo/colors'
import { computeChordLayout, computeChordGenerators, computeChordArcsAndRibbons } from './compute'
import { ArcDatum, ChordCommonProps, ChordDataProps, CustomLayerProps, RibbonDatum } from './types'
import { commonDefaultProps } from './defaults'
import { ChordLayout } from 'd3-chord'

export const useChordLayout = ({ padAngle }: { padAngle: ChordCommonProps['padAngle'] }) =>
    useMemo(() => computeChordLayout({ padAngle }), [padAngle])

export const useChordGenerators = ({
    width,
    height,
    innerRadiusRatio,
    innerRadiusOffset,
}: {
    width: number
    height: number
    innerRadiusRatio: ChordCommonProps['innerRadiusRatio']
    innerRadiusOffset: ChordCommonProps['innerRadiusOffset']
}) =>
    useMemo(
        () =>
            computeChordGenerators({
                width,
                height,
                innerRadiusRatio,
                innerRadiusOffset,
            }),
        [width, height, innerRadiusRatio, innerRadiusOffset]
    )

export const useChordArcsAndRibbons = ({
    chord,
    getColor,
    keys,
    data,
    getLabel,
    formatValue,
}: {
    chord: ChordLayout
    data: ChordDataProps['data']
    keys: ChordDataProps['keys']
    getLabel: (arc: Omit<ArcDatum, 'label' | 'color'>) => string
    formatValue: (value: number) => string
    getColor: OrdinalColorScale<Omit<ArcDatum, 'label' | 'color'>>
}) =>
    useMemo(
        () =>
            computeChordArcsAndRibbons({
                chord,
                data,
                keys,
                getLabel,
                formatValue,
                getColor,
            }),
        [chord, getColor, keys, data, getLabel, formatValue]
    )

export const useChord = ({
    data,
    keys,
    label = commonDefaultProps.label,
    valueFormat,
    width,
    height,
    innerRadiusRatio = commonDefaultProps.innerRadiusRatio,
    innerRadiusOffset = commonDefaultProps.innerRadiusOffset,
    padAngle = commonDefaultProps.padAngle,
    colors = commonDefaultProps.colors,
}: {
    data: ChordDataProps['data']
    keys: ChordDataProps['keys']
    label?: ChordCommonProps['label']
    valueFormat?: ChordCommonProps['valueFormat']
    width: number
    height: number
    innerRadiusRatio?: ChordCommonProps['innerRadiusRatio']
    innerRadiusOffset?: ChordCommonProps['innerRadiusOffset']
    padAngle?: ChordCommonProps['padAngle']
    colors?: ChordCommonProps['colors']
}) => {
    const chord = useChordLayout({ padAngle })
    const { center, radius, innerRadius, arcGenerator, ribbonGenerator } = useChordGenerators({
        width,
        height,
        innerRadiusRatio,
        innerRadiusOffset,
    })
    const getLabel = useMemo(() => getLabelGenerator(label), [label])
    const formatValue = useValueFormatter<number>(valueFormat)

    const getColor = useOrdinalColorScale(colors, 'id')
    const { arcs, ribbons } = useChordArcsAndRibbons({
        chord,
        getColor,
        keys,
        data,
        getLabel,
        formatValue,
    })

    return {
        center,
        chord,
        radius,
        innerRadius,
        arcGenerator,
        ribbonGenerator,
        getColor,
        arcs,
        ribbons,
    }
}

export const useChordSelection = ({
    arcOpacity = commonDefaultProps.arcOpacity,
    activeArcOpacity = commonDefaultProps.activeArcOpacity,
    inactiveArcOpacity = commonDefaultProps.inactiveArcOpacity,
    ribbons,
    ribbonOpacity = commonDefaultProps.ribbonOpacity,
    activeRibbonOpacity = commonDefaultProps.activeRibbonOpacity,
    inactiveRibbonOpacity = commonDefaultProps.inactiveRibbonOpacity,
}: {
    arcOpacity?: ChordCommonProps['arcOpacity']
    activeArcOpacity?: ChordCommonProps['activeArcOpacity']
    inactiveArcOpacity?: ChordCommonProps['inactiveArcOpacity']
    ribbons: RibbonDatum[]
    ribbonOpacity?: ChordCommonProps['ribbonOpacity']
    activeRibbonOpacity?: ChordCommonProps['activeRibbonOpacity']
    inactiveRibbonOpacity?: ChordCommonProps['inactiveRibbonOpacity']
}) => {
    const [currentArc, setCurrentArc] = useState<ArcDatum | null>(null)
    const [currentRibbon, setCurrentRibbon] = useState<RibbonDatum | null>(null)

    const selection = useMemo(() => {
        const selectedArcIds = []
        const selectedRibbonIds = []

        if (currentArc) {
            selectedArcIds.push(currentArc.id)
            ribbons
                .filter(
                    ribbon =>
                        ribbon.source.id === currentArc.id || ribbon.target.id === currentArc.id
                )
                .forEach(ribbon => {
                    selectedRibbonIds.push(ribbon.id)
                })
        }

        if (currentRibbon) {
            selectedArcIds.push(currentRibbon.source.id)
            selectedArcIds.push(currentRibbon.target.id)
            selectedRibbonIds.push(currentRibbon.id)
        }

        return { selectedArcIds, selectedRibbonIds }
    }, [currentArc, currentRibbon, ribbons])

    const hasSelection =
        selection.selectedArcIds.length > 1 || selection.selectedRibbonIds.length > 0

    const getArcOpacity = useMemo(
        () => (arc: ArcDatum) => {
            if (!hasSelection) return arcOpacity

            return selection.selectedArcIds.includes(arc.id) ? activeArcOpacity : inactiveArcOpacity
        },
        [hasSelection, selection.selectedArcIds, arcOpacity, activeArcOpacity, inactiveArcOpacity]
    )
    const getRibbonOpacity = useMemo(
        () => (ribbon: RibbonDatum) => {
            if (!hasSelection) return ribbonOpacity

            return selection.selectedRibbonIds.includes(ribbon.id)
                ? activeRibbonOpacity
                : inactiveRibbonOpacity
        },
        [
            hasSelection,
            selection.selectedRibbonIds,
            ribbonOpacity,
            activeRibbonOpacity,
            inactiveRibbonOpacity,
        ]
    )

    return {
        currentArc,
        setCurrentArc,
        currentRibbon,
        setCurrentRibbon,
        hasSelection,
        ...selection,
        getArcOpacity,
        getRibbonOpacity,
    }
}

export const useCustomLayerProps = ({
    center,
    radius,
    arcs,
    arcGenerator,
    ribbons,
    ribbonGenerator,
}: {
    center: [number, number]
    radius: number
    arcs: ArcDatum[]
    arcGenerator: any
    ribbons: RibbonDatum[]
    ribbonGenerator: any
}): CustomLayerProps =>
    useMemo(
        () => ({
            center,
            radius,
            arcs,
            arcGenerator,
            ribbons,
            ribbonGenerator,
        }),
        [center, radius, arcs, arcGenerator, ribbons, ribbonGenerator]
    )
