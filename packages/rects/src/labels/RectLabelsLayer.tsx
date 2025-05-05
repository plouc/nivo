import { createElement, useMemo } from 'react'
import { to } from '@react-spring/web'
import { usePropertyAccessor } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { useTheme } from '@nivo/theming'
import { DatumWithRectAndColor, RectTransitionMode } from '../types'
import { useRectAnchorsTransition } from '../useRectAnchorsTransition'
import { RectLabelsProps, RectComputedLabel, RectLabelComponent } from './types'
import { RectLabel } from './RectLabel'
import { anchorGetter, getSvgTextLayout } from './compute'

export interface RectLabelsLayerProps<Datum extends DatumWithRectAndColor> {
    data: readonly Datum[]
    uid: RectLabelsProps<Datum>['uid']
    label: RectLabelsProps<Datum>['label']
    boxAnchor: RectLabelsProps<Datum>['labelBoxAnchor']
    anchor?: RectLabelsProps<Datum>['labelAnchor']
    baseline?: RectLabelsProps<Datum>['labelBaseline']
    paddingX?: RectLabelsProps<Datum>['labelPaddingX']
    paddingY?: RectLabelsProps<Datum>['labelPaddingY']
    rotation?: RectLabelsProps<Datum>['labelRotation']
    skipWidth?: RectLabelsProps<Datum>['labelSkipWidth']
    skipHeight?: RectLabelsProps<Datum>['labelSkipHeight']
    textColor: RectLabelsProps<Datum>['labelTextColor']
    transitionMode?: RectTransitionMode
    component?: RectLabelsProps<Datum>['labelComponent']
    getTestId?: (datum: Omit<Datum, 'rect'>) => string
}

const extractRotation = ({ rotation }: { rotation: number }) => ({ rotation })

export const RectLabelsLayer = <Datum extends DatumWithRectAndColor>({
    data,
    uid,
    label: labelAccessor,
    boxAnchor = 'center',
    anchor = 'auto',
    baseline = 'auto',
    paddingX = 0,
    paddingY = 0,
    rotation = 0,
    skipWidth = 0,
    skipHeight = 0,
    textColor = { theme: 'labels.text.fill' },
    transitionMode = 'flow-down',
    component = RectLabel,
    getTestId,
}: RectLabelsLayerProps<Datum>) => {
    const getUid = usePropertyAccessor(uid)
    const getLabel = usePropertyAccessor(labelAccessor)

    const theme = useTheme()
    const getTextColor = useInheritedColor(textColor, theme)

    const textLayout = useMemo(
        () => getSvgTextLayout(boxAnchor, anchor, baseline),
        [boxAnchor, anchor, baseline]
    )

    const computedLabels = useMemo(() => {
        const getAnchor = anchorGetter(boxAnchor, paddingX, paddingY)

        return (
            data
                .filter(datum => {
                    return datum.rect.width >= skipWidth && datum.rect.height >= skipHeight
                })
                // We lift the rect from the datum, for easier access.
                .map(({ rect, ...datum }) => {
                    return {
                        id: getUid(datum),
                        label: getLabel(datum),
                        color: getTextColor(datum),
                        ...getAnchor(rect),
                        rotation,
                        rect,
                        data: datum,
                    }
                }) as RectComputedLabel<Datum>[]
        )
    }, [
        data,
        getUid,
        paddingX,
        paddingY,
        skipWidth,
        skipHeight,
        getLabel,
        boxAnchor,
        rotation,
        getTextColor,
    ])

    const transition = useRectAnchorsTransition<RectComputedLabel<Datum>, { rotation: number }>(
        computedLabels,
        transitionMode,
        {
            enter: extractRotation,
            update: extractRotation,
            leave: extractRotation,
        }
    )

    const Label: RectLabelComponent<Datum> = component

    return (
        <g>
            {transition((transitionProps, datum) => {
                return createElement(Label, {
                    key: datum.id,
                    ...datum,
                    style: {
                        ...transitionProps,
                        transform: to(
                            [transitionProps.x, transitionProps.y, transitionProps.rotation],
                            (x, y, rotation) => `translate(${x},${y}) rotate(${rotation})`
                        ),
                        ...textLayout,
                    },
                    testId: getTestId?.(datum.data),
                })
            })}
        </g>
    )
}
