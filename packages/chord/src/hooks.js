import { useMemo, useState } from 'react'
import { useValueFormatter, getLabelGenerator } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { computeChordLayout, computeChordGenerators, computeChordArcsAndRibbons } from './compute'

export const useChordLayout = ({ padAngle }) =>
    useMemo(() => computeChordLayout({ padAngle }), [padAngle])

export const useChordGenerators = ({ width, height, innerRadiusRatio, innerRadiusOffset }) =>
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

export const useChordArcsAndRibbons = ({ chord, getColor, keys, matrix, getLabel, formatValue }) =>
    useMemo(
        () =>
            computeChordArcsAndRibbons({
                chord,
                getColor,
                keys,
                matrix,
                getLabel,
                formatValue,
            }),
        [chord, getColor, keys, matrix, getLabel, formatValue]
    )

export const useChord = ({
    keys,
    matrix,
    label,
    valueFormat,
    width,
    height,
    innerRadiusRatio,
    innerRadiusOffset,
    padAngle,
    colors,
}) => {
    const chord = useChordLayout({ padAngle })
    const { center, radius, innerRadius, arcGenerator, ribbonGenerator } = useChordGenerators({
        width,
        height,
        innerRadiusRatio,
        innerRadiusOffset,
    })
    const getLabel = useMemo(() => getLabelGenerator(label), [label])
    const formatValue = useValueFormatter(valueFormat)

    const getColor = useOrdinalColorScale(colors, 'id')
    const { arcs, ribbons } = useChordArcsAndRibbons({
        chord,
        getColor,
        keys,
        matrix,
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
    arcs,
    arcOpacity,
    arcHoverOpacity,
    arcHoverOthersOpacity,
    ribbons,
    ribbonOpacity,
    ribbonHoverOpacity,
    ribbonHoverOthersOpacity,
}) => {
    const [currentArc, setCurrentArc] = useState(null)
    const [currentRibbon, setCurrentRibbon] = useState(null)

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
    }, [currentArc, currentRibbon, arcs, ribbons])

    const hasSelection =
        selection.selectedArcIds.length > 1 || selection.selectedRibbonIds.length > 0

    const getArcOpacity = useMemo(
        () => arc => {
            if (!hasSelection) return arcOpacity
            return selection.selectedArcIds.includes(arc.id)
                ? arcHoverOpacity
                : arcHoverOthersOpacity
        },
        [selection.selectedArcIds, arcOpacity, arcHoverOpacity, arcHoverOthersOpacity]
    )
    const getRibbonOpacity = useMemo(
        () => ribbon => {
            if (!hasSelection) return ribbonOpacity
            return selection.selectedRibbonIds.includes(ribbon.id)
                ? ribbonHoverOpacity
                : ribbonHoverOthersOpacity
        },
        [selection.selectedRibbonIds, ribbonOpacity, ribbonHoverOpacity, ribbonHoverOthersOpacity]
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

export const useChordLayerContext = ({
    center,
    radius,
    arcs,
    arcGenerator,
    ribbons,
    ribbonGenerator,
}) =>
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
