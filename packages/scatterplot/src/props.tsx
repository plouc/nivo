import { CssMixBlendMode } from '@nivo/core'
import { Node } from './Node'
import { Tooltip } from './Tooltip'
import {
    ScatterPlotCommonProps,
    ScatterPlotDatum,
    ScatterPlotLayerId,
    ScatterPlotNodeData,
} from './types'

export const commonDefaultProps = {
    xScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    } as ScatterPlotCommonProps<ScatterPlotDatum>['xScale'],
    yScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    } as ScatterPlotCommonProps<ScatterPlotDatum>['yScale'],

    enableGridX: true,
    enableGridY: true,
    axisBottom: {},
    axisLeft: {},

    nodeId: (({ serieId, index }) => `${serieId}.${index}`) as ScatterPlotCommonProps<
        ScatterPlotDatum
    >['nodeId'],
    nodeSize: 9,
    nodeComponent: Node,

    colors: { scheme: 'nivo' } as ScatterPlotCommonProps<ScatterPlotDatum>['colors'],

    isInteractive: true,
    debugMesh: false,

    tooltip: Tooltip,

    markers: [],

    legends: [],

    annotations: [],
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    blendMode: 'normal' as CssMixBlendMode,
    layers: [
        'grid',
        'axes',
        'nodes',
        'markers',
        'mesh',
        'legends',
        'annotations',
    ] as ScatterPlotLayerId[],
    role: 'img',
    useMesh: true,
    animate: true,
    motionConfig: 'default',
}

export const canvasDefaultProps = {
    ...commonDefaultProps,
    layers: ['grid', 'axes', 'nodes', 'mesh', 'legends', 'annotations'] as ScatterPlotLayerId[],
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
    renderNode: (ctx: CanvasRenderingContext2D, node: ScatterPlotNodeData<ScatterPlotDatum>) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size / 2, 0, 2 * Math.PI)
        ctx.fillStyle = node.color
        ctx.fill()
    },
}
