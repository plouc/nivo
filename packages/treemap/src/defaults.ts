import { TreeMapCommonProps, DefaultTreeMapDatum, LayerId, NodeProps } from './types'
import { TreeMapNode } from './TreeMapNode'
import { TreeMapNodeTooltip } from './TreeMapNodeTooltip'
import { TreeMapHtmlNode } from './TreeMapHtmlNode'

type CommonDefaultProps = Omit<
    TreeMapCommonProps<DefaultTreeMapDatum>,
    | 'valueFormat'
    | 'margin'
    | 'theme'
    | 'labelFormat'
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'onClick'
    | 'renderWrapper'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
> & {
    layers: LayerId[]
}

type SvgDefaultProps = CommonDefaultProps & {
    defs: never[]
    fill: never[]
    animate?: boolean | undefined
    nodeComponent: <Datum extends object>({ node, animatedProps, borderWidth, enableLabel, enableParentLabel, labelSkipSize, }: NodeProps<Datum>) => JSX.Element
}

type HtmlDefaultProps = CommonDefaultProps & {
    nodeComponent: <Datum extends object>({ node, animatedProps, borderWidth, enableLabel, enableParentLabel, labelSkipSize, }: NodeProps<Datum>) => JSX.Element

}
type CanvasDefaultProps = CommonDefaultProps & {
    pixelRatio: number
}



export const commonDefaultProps: CommonDefaultProps = {
    layers: ['nodes'],

    identity: 'id',
    value: 'value',

    tile: 'squarify',
    leavesOnly: false,
    innerPadding: 0,
    outerPadding: 0,

    colors: { scheme: 'nivo' as const },
    colorBy: 'pathComponents.1',
    nodeOpacity: 0.33,

    enableLabel: true,
    label: 'formattedValue',
    labelSkipSize: 0,
    labelTextColor: { from: 'color', modifiers: [['darker', 1]] },
    orientLabel: true,

    enableParentLabel: true,
    parentLabel: 'id',
    parentLabelSize: 20,
    parentLabelPosition: 'top',
    parentLabelPadding: 6,
    parentLabelTextColor: { from: 'color', modifiers: [['darker', 1]] },

    borderWidth: 1,
    borderColor: { from: 'color', modifiers: [['darker', 1]] },

    isInteractive: true,
    tooltip: TreeMapNodeTooltip,

    role: 'img',

    animate: true,
    motionConfig: 'gentle',
}

export const svgDefaultProps: SvgDefaultProps = {
    ...commonDefaultProps,
    nodeComponent: TreeMapNode,
    defs: [],
    fill: [],
}

export const htmlDefaultProps: HtmlDefaultProps = {
    ...commonDefaultProps,
    nodeComponent: TreeMapHtmlNode,
}

export const canvasDefaultProps: CanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
}
