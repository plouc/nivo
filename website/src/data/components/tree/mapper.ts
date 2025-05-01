import { TreeCanvasProps, TreeSvgProps } from '@nivo/tree'

export type MappedTreeSvgProps<Datum> = Pick<
    TreeSvgProps<Datum>,
    | 'identity'
    | 'mode'
    | 'layout'
    | 'nodeSize'
    | 'activeNodeSize'
    | 'inactiveNodeSize'
    | 'nodeColor'
    | 'fixNodeColorAtDepth'
    | 'linkCurve'
    | 'linkThickness'
    | 'activeLinkThickness'
    | 'inactiveLinkThickness'
    | 'linkColor'
    | 'enableLabel'
    | 'labelsPosition'
    | 'orientLabel'
    | 'labelOffset'
    | 'margin'
    | 'animate'
    | 'motionConfig'
    | 'isInteractive'
    | 'useMesh'
    | 'meshDetectionRadius'
    | 'debugMesh'
    | 'highlightAncestorNodes'
    | 'highlightDescendantNodes'
    | 'highlightAncestorLinks'
    | 'highlightDescendantLinks'
    | 'nodeTooltipAnchor'
    | 'nodeTooltipPosition'
    | 'linkTooltipAnchor'
>

export type MappedTreeCanvasProps<Datum> = MappedTreeSvgProps<Datum> &
    Pick<TreeCanvasProps<Datum>, 'pixelRatio'>
