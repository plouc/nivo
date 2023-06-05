import { createElement, useCallback, useState } from 'react'
import { usePropertyAccessor } from '@bitbloom/nivo-core'
import { DatumWithArcAndColor } from '../types'
import { useArcLinkLabelsTransition } from './useArcLinkLabelsTransition'
import { ArcLinkLabelsProps } from './props'
import { ArcLinkLabel, ArcLinkLabelProps } from './ArcLinkLabel'
import { intersects } from '../utils'

export type ArcLinkLabelComponent<Datum extends DatumWithArcAndColor> = (
    props: ArcLinkLabelProps<Datum>
) => JSX.Element

interface ArcLinkLabelsLayerProps<Datum extends DatumWithArcAndColor> {
    center: [number, number]
    data: Datum[]
    activeId?: string | number
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

interface ClipType {
    /** dimensions for each label to clip */
    dimensions: { [key: string]: DOMRect }
    /** rectangles already rendered which should be avoided */
    avoid?: DOMRect[]
    /** number of dimensions required before can perform clipping */
    dimsRequired: number
    /** id of active label, which is always shown */
    activeId?: string | number
}

export const ArcLinkLabelsLayer = <Datum extends DatumWithArcAndColor>({
    center,
    data,
    activeId,
    label,
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
    const {
        transition,
        interpolateLink,
        interpolateTextAnchor,
        interpolateTextPosition,
    } = useArcLinkLabelsTransition<Datum>({
            data,
            skipAngle,
            offset,
            diagonalLength,
            straightLength,
            textOffset,
            linkColor,
            textColor,
        })

    const [clip, setClip] = useState<ClipType>({
        dimensions: {},
        dimsRequired: data.length,
        activeId
    })

    if (clip.activeId !== activeId) {
        // clears cached label dimensions if active label changes
        const dimensions = { ...clip.dimensions }
        let dimsRequired = 0	

        if (clip.activeId) {
            delete dimensions[clip.activeId]
            ++dimsRequired
        }

        if (activeId) {
            delete dimensions[activeId]
            ++dimsRequired
        }

        setClip({
            dimensions,
            dimsRequired,
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

interface ArcLinkLabelItemProps<Datum extends DatumWithArcAndColor> {
    clip: ClipType
    setClip: (clip: ClipType) => void
    activeId?: string | number
    component: any
    label: ArcLinkLabelsProps<Datum>['arcLinkLabel']
    strokeWidth: number
    transitionProps: any
    datum: Datum
    interpolateLink: any
    interpolateTextAnchor: any
    interpolateTextPosition: any
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
}: ArcLinkLabelItemProps<Datum>) {
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
                if (clip.dimsRequired === 0) setClip({ ...clip, avoid: [] })
            }
        }
    }, [setClip, activeId])

    let clipped = true

    if (dimensions && clip.avoid) {
        if (datum.id == activeId ||
            !clip.avoid.reduce((found: boolean, rect: DOMRect) => found || intersects(dimensions, rect), false)) {
            clipped = false
            clip.avoid.push(dimensions)
        }
    } else if (!dimensions) {
        delete clip.dimensions[datum.id]
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

    return <g ref={ref} key={datum.id}>{createElement(Label, { datum, label: getLabel(datum), style })}</g>
}
