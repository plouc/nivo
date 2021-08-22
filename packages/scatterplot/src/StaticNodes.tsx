import { CssMixBlendMode } from '@nivo/core'
import { NodeWrapper } from './NodeWrapper'
import {
    ScatterPlotCommonProps,
    ScatterPlotDatum,
    ScatterPlotNode,
    ScatterPlotNodeData,
} from './types'

interface StaticNodesProps<RawDatum extends ScatterPlotDatum> {
    nodes: ScatterPlotNodeData<RawDatum>[]
    renderNode: ScatterPlotNode<RawDatum>
    isInteractive: boolean
    onMouseEnter?: ScatterPlotCommonProps<RawDatum>['onMouseEnter']
    onMouseMove?: ScatterPlotCommonProps<RawDatum>['onMouseMove']
    onMouseLeave?: ScatterPlotCommonProps<RawDatum>['onMouseLeave']
    onClick?: ScatterPlotCommonProps<RawDatum>['onClick']
    tooltip: ScatterPlotCommonProps<RawDatum>['tooltip']
    blendMode: CssMixBlendMode
}

export const StaticNodes = <RawDatum extends ScatterPlotDatum>({
    nodes,
    renderNode,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    blendMode,
}: StaticNodesProps<RawDatum>) => (
    <>
        {nodes.map(node => (
            <NodeWrapper<RawDatum>
                key={node.id}
                node={node}
                renderNode={renderNode}
                x={node.x}
                y={node.y}
                size={node.size}
                color={node.style.color}
                isInteractive={isInteractive}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                tooltip={tooltip}
                blendMode={blendMode}
            />
        ))}
    </>
)
