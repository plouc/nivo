import { createElement, useMemo } from 'react'
import { to } from '@react-spring/web'
import { usePropertyAccessor } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { useTheme } from '@nivo/theming'
import { DatumWithRectAndColor, RectTransitionMode } from '../types'
import { useRectAnchorsTransition } from '../useRectAnchorsTransition'
import {
    RectLabelsProps as PublicRectLabelProps,
    RectComputedLabel,
    RectLabelComponent,
} from './types'
import { anchorGetter, getTextLayout } from './compute'

interface RectLabelsProps<Datum extends DatumWithRectAndColor> {
    data: readonly Datum[]
    uid: PublicRectLabelProps<Datum>['uid']
    label: PublicRectLabelProps<Datum>['label']
    boxAnchor: PublicRectLabelProps<Datum>['labelBoxAnchor']
    align?: PublicRectLabelProps<Datum>['labelAlign']
    baseline?: PublicRectLabelProps<Datum>['labelBaseline']
    paddingX?: PublicRectLabelProps<Datum>['labelPaddingX']
    paddingY?: PublicRectLabelProps<Datum>['labelPaddingY']
    rotation?: PublicRectLabelProps<Datum>['labelRotation']
    skipWidth?: PublicRectLabelProps<Datum>['labelSkipWidth']
    skipHeight?: PublicRectLabelProps<Datum>['labelSkipHeight']
    textColor: PublicRectLabelProps<Datum>['labelTextColor']
    transitionMode?: RectTransitionMode
    component: RectLabelComponent<Datum>
    getTestId?: (datum: Omit<Datum, 'rect'>) => string
}

const extractRotation = ({ rotation }: { rotation: number }) => ({ rotation })

export const RectLabels = <Datum extends DatumWithRectAndColor>({
    data,
    uid,
    label: labelAccessor,
    boxAnchor = 'center',
    align = 'auto',
    baseline = 'auto',
    paddingX = 0,
    paddingY = 0,
    rotation = 0,
    skipWidth = 0,
    skipHeight = 0,
    textColor = { theme: 'labels.text.fill' },
    transitionMode = 'flow-down',
    component,
    getTestId,
}: RectLabelsProps<Datum>) => {
    const getUid = usePropertyAccessor(uid)
    const getLabel = usePropertyAccessor(labelAccessor)

    const theme = useTheme()
    const getTextColor = useInheritedColor(textColor, theme)

    const textLayout = useMemo(
        () => getTextLayout(boxAnchor, align, baseline),
        [boxAnchor, align, baseline]
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

    return (
        <>
            {transition((transitionProps, datum) => {
                return createElement(component, {
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
        </>
    )
}
