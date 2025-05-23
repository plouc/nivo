import { Axis } from '@nivo/axes'
import { BulletSvgPropsWithDefaults, BulletNode, BulletSvgOverrides } from './types'
import { getDatumOverrides } from './hooks'

type BulletAxesLayerProps = Pick<
    BulletSvgPropsWithDefaults,
    'layout' | 'valuePadding' | 'axisBefore' | 'axisAfter' | 'overrides'
> & {
    nodes: readonly BulletNode[]
}

export const BulletAxesLayer = ({
    nodes,
    layout,
    valuePadding,
    axisBefore: globalAxisBefore,
    axisAfter: globalAxisAfter,
    overrides,
}: BulletAxesLayerProps) => {
    return (
        <>
            {nodes.map(node => {
                const nodeOverrides = getDatumOverrides<BulletSvgOverrides>(node.datum, overrides)
                const axisBefore =
                    nodeOverrides?.axisBefore === undefined
                        ? globalAxisBefore
                        : nodeOverrides?.axisBefore
                const axisAfter =
                    nodeOverrides?.axisAfter === undefined
                        ? globalAxisAfter
                        : nodeOverrides?.axisAfter

                if (!axisBefore && !axisAfter) return null

                const axesAfterX =
                    node.rect.x + (layout === 'horizontal' ? valuePadding : node.rect.width)
                const axesAfterY =
                    node.rect.y + (layout === 'horizontal' ? node.rect.height : valuePadding)
                const axesLength = layout === 'horizontal' ? node.rect.width : node.rect.height

                return (
                    <g key={node.datum.id}>
                        {axisBefore && (
                            <Axis
                                {...axisBefore}
                                x={node.rect.x}
                                y={node.rect.y}
                                axis={layout === 'horizontal' ? 'x' : 'y'}
                                length={axesLength}
                                scale={node.scale}
                                ticksPosition="before"
                            />
                        )}
                        {axisAfter && (
                            <Axis
                                {...axisAfter}
                                x={axesAfterX}
                                y={axesAfterY}
                                axis={layout === 'horizontal' ? 'x' : 'y'}
                                length={axesLength}
                                scale={node.scale}
                                ticksPosition="after"
                            />
                        )}
                    </g>
                )
            })}
        </>
    )
}
