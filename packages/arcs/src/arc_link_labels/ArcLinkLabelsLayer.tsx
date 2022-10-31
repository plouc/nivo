import { createElement, useCallback, useState } from 'react'
import { usePropertyAccessor } from '@bitbloom/nivo-core'
import { DatumWithArcAndColor } from '../types'
import { useArcLinkLabelsTransition } from './useArcLinkLabelsTransition'
import { ArcLinkLabelsProps } from './props'
import { ArcLinkLabel, ArcLinkLabelProps } from './ArcLinkLabel'

export type ArcLinkLabelComponent<Datum extends DatumWithArcAndColor> = (
    props: ArcLinkLabelProps<Datum>
) => JSX.Element

interface ArcLinkLabelsLayerProps<Datum extends DatumWithArcAndColor> {
    center: [number, number]
    data: Datum[]
    activeId?: string
    label: ArcLinkLabelsProps<Datum>['arcLinkLabel']
    skipAngle: ArcLinkLabelsProps<Datum>['arcLinkLabelsSkipAngle']
    offset: ArcLinkLabelsProps<Datum>['arcLinkLabelsOffset']
    diagonalLength: ArcLinkLabelsProps<Datum>['arcLinkLabelsDiagonalLength']
    straightLength: ArcLinkLabelsProps<Datum>['arcLinkLabelsStraightLength']
    strokeWidth: ArcLinkLabelsProps<Datum>['arcLinkLabelsThickness']
    textOffset: ArcLinkLabelsProps<Datum>['arcLinkLabelsTextOffset']
    textColor: ArcLinkLabelsProps<Datum>['arcLinkLabelsTextColor']
    linkColor: ArcLinkLabelsProps<Datum>['arcLinkLabelsColor']
    component?: ArcLinkLabelComponent<Datum>
}

export const ArcLinkLabelsLayer = <Datum extends DatumWithArcAndColor>({
    center,
    data,
    activeId,
    label: labelAccessor,
    skipAngle,
    offset,
    diagonalLength,
    straightLength,
    strokeWidth,
    textOffset,
    textColor,
    linkColor,
    component = ArcLinkLabel,
}: ArcLinkLabelsLayerProps<Datum>) => {
    const getLabel = usePropertyAccessor<Datum, string>(labelAccessor)

    const { transition, interpolateLink, interpolateTextAnchor, interpolateTextPosition } =
        useArcLinkLabelsTransition<Datum>({
            data,
            skipAngle,
            offset,
            diagonalLength,
            straightLength,
            textOffset,
            linkColor,
            textColor,
        })

    const [clip, setClip] = useState<{ dimensions: { [key: string]: DOMRect }, active?: DOMRect[], dimsRequired: number, activeId?: string }>({
        dimensions: {},
        dimsRequired: data.length,
        activeId
    })

    if (clip.activeId !== activeId) {
        // clears cached label dimensions if active label changes
        setClip({
            dimensions: {},
            dimsRequired: data.length,
            activeId
        })
    }

    return (
        <g transform={`translate(${center[0]},${center[1]})`}>
            {[true, false].map(active => transition((transitionProps, datum) => active == (datum.id == activeId) && <ArcLinkLabelItem
                clip={clip}
                setClip={setClip}
                component={component}
                label={label}
                strokeWidth={strokeWidth}
                transitionProps={transitionProps}
                datum={datum}
                key={datum.id}
                activeId={activeId}
                interpolateLink={interpolateLink}
                interpolateTextAnchor={interpolateTextAnchor}
                interpolateTextPosition={interpolateTextPosition} />))}
        </g>
    )
}

function intersects(a: DOMRect, b?: DOMRect): boolean {
    if (!b) return false
    const inset = 0 // allow small amount of overlap of bounds as usually won't obscure text
    if (a.left > b.right - inset) return false
    if (a.top > b.bottom - inset) return false
    if (a.right < b.left + inset) return false
    if (a.bottom < b.top + inset) return false
    return true
}

function ArcLinkLabelItem<Datum extends DatumWithArcAndColor>({
    clip,
    setClip,
    activeId,
    component,
    label,
    strokeWidth,
    transitionProps,
    datum,
    interpolateLink,
    interpolateTextAnchor,
    interpolateTextPosition,
}: any) {
    const getLabel = usePropertyAccessor<Datum, string>(label)
    const Label: ArcLinkLabelComponent<Datum> = component
    const dimensions = clip.dimensions[datum.id]

    const ref = useCallback((domNode: SVGElement | null) => {
        if (domNode) {
            // the intention is to gather dimensions of all labels then update the state of the parent 
            // to re-render once all the dimensions are gathered
            const hasDims = !!clip.dimensions[datum.id]
            clip.dimensions[datum.id] = domNode.getBoundingClientRect()
            if (!hasDims) {
                --clip.dimsRequired
                if (clip.dimsRequired === 0) setClip({ ...clip, active: [] })
            }
        }
    }, [setClip])

    let clipped = true

    if (dimensions && clip.active) {
        if (datum.id == activeId ||
            !clip.active.reduce((found: boolean, rect: DOMRect) => found || intersects(dimensions, rect), false)) {
            clipped = false
            clip.active.push(dimensions)
        }
    } else if (!dimensions) {
        clip.dimensions[datum.id] = null
    }

    const opacity = clipped ? 0.05 : (activeId && datum.id !== activeId ? 0.5 : 1)
    const style = {
        ...transitionProps,
        opacity,
        thickness: strokeWidth,
        path: interpolateLink(
            transitionProps.startAngle,
            transitionProps.endAngle,
            transitionProps.innerRadius,
            transitionProps.outerRadius,
            transitionProps.offset,
            transitionProps.diagonalLength,
            transitionProps.straightLength
        ),
        textAnchor: interpolateTextAnchor(
            transitionProps.startAngle,
            transitionProps.endAngle,
            transitionProps.innerRadius,
            transitionProps.outerRadius
        ),
        textPosition: interpolateTextPosition(
            transitionProps.startAngle,
            transitionProps.endAngle,
            transitionProps.innerRadius,
            transitionProps.outerRadius,
            transitionProps.offset,
            transitionProps.diagonalLength,
            transitionProps.straightLength,
            transitionProps.textOffset
    )
}
