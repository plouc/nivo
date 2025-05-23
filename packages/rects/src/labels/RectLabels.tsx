import { createElement, useMemo } from 'react'
import { usePropertyAccessor } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { useTheme } from '@nivo/theming'
import { NodeWithRectAndColor, RectTransitionMode } from '../types'
import { useRectAnchorsTransition } from '../useRectAnchorsTransition'
import {
    RectLabelsProps as PublicRectLabelProps,
    RectComputedLabel,
    RectLabelComponent,
} from './types'
import { anchorGetter, getTextLayout } from './compute'

interface RectLabelsProps<Node extends NodeWithRectAndColor> {
    nodes: readonly Node[]
    uid: PublicRectLabelProps<Node>['uid']
    label: PublicRectLabelProps<Node>['label']
    boxAnchor: PublicRectLabelProps<Node>['labelBoxAnchor']
    isOutside?: PublicRectLabelProps<Node>['labelIsOutside']
    align?: PublicRectLabelProps<Node>['labelAlign']
    baseline?: PublicRectLabelProps<Node>['labelBaseline']
    paddingX?: PublicRectLabelProps<Node>['labelPaddingX']
    paddingY?: PublicRectLabelProps<Node>['labelPaddingY']
    offsetX?: PublicRectLabelProps<Node>['labelOffsetX']
    offsetY?: PublicRectLabelProps<Node>['labelOffsetY']
    rotation?: PublicRectLabelProps<Node>['labelRotation']
    skipWidth?: PublicRectLabelProps<Node>['labelSkipWidth']
    skipHeight?: PublicRectLabelProps<Node>['labelSkipHeight']
    textColor: PublicRectLabelProps<Node>['labelTextColor']
    transitionMode?: RectTransitionMode
    component: RectLabelComponent<Node>
    getTestId?: (node: Omit<Node, 'rect'>) => string
}

const extractRotation = ({ rotation }: { rotation: number }) => ({ rotation })

export const RectLabels = <Node extends NodeWithRectAndColor>({
    nodes,
    uid,
    label: labelAccessor,
    boxAnchor = 'center',
    isOutside = false,
    align = 'auto',
    baseline = 'auto',
    paddingX = 0,
    paddingY = 0,
    offsetX = 0,
    offsetY = 0,
    rotation = 0,
    skipWidth = 0,
    skipHeight = 0,
    textColor = { theme: 'labels.text.fill' },
    transitionMode = 'flow-down',
    component,
    getTestId,
}: RectLabelsProps<Node>) => {
    const getUid = usePropertyAccessor(uid)
    const getLabel = usePropertyAccessor(labelAccessor)

    const theme = useTheme()
    const getTextColor = useInheritedColor(textColor, theme)

    const textLayout = useMemo(
        () => getTextLayout(boxAnchor, isOutside, align, baseline),
        [boxAnchor, isOutside, align, baseline]
    )

    const computedLabels = useMemo(() => {
        const getAnchor = anchorGetter(boxAnchor, {
            isOutside,
            paddingX,
            paddingY,
            offsetX,
            offsetY,
        })

        return (
            nodes
                .filter(node => {
                    return node.rect.width >= skipWidth && node.rect.height >= skipHeight
                })
                // We lift the rect from the node, for easier access.
                .map(({ rect, ...node }) => {
                    return {
                        id: getUid(node),
                        label: getLabel(node),
                        color: getTextColor(node),
                        ...getAnchor(rect),
                        rotation,
                        rect,
                        node,
                    }
                }) as RectComputedLabel<Node>[]
        )
    }, [
        nodes,
        getUid,
        paddingX,
        paddingY,
        offsetX,
        offsetY,
        skipWidth,
        skipHeight,
        getLabel,
        boxAnchor,
        rotation,
        getTextColor,
    ])

    const transition = useRectAnchorsTransition<RectComputedLabel<Node>, { rotation: number }>(
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
            {transition((transitionProps, label) => {
                return createElement(component, {
                    key: label.id,
                    ...label,
                    style: {
                        ...transitionProps,
                        align: textLayout.align,
                        baseline: textLayout.baseline,
                    },
                    testId: getTestId?.(label.node),
                })
            })}
        </>
    )
}
