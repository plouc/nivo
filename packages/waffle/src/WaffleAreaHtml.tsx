import { Line } from 'd3-shape'
import { Vertex } from '@nivo/grid'
import { ComputedDatum, Datum, WaffleHtmlProps } from './types'
import { useAreaMouseHandlers } from './hooks'

interface WaffleAreaHtmlProps<D extends Datum> {
    data: ComputedDatum<D>
    pathGenerator: Line<Vertex>
    isInteractive: Exclude<WaffleHtmlProps<D>['isInteractive'], undefined>
    onMouseEnter: WaffleHtmlProps<D>['onMouseEnter']
    onMouseMove: WaffleHtmlProps<D>['onMouseMove']
    onMouseLeave: WaffleHtmlProps<D>['onMouseLeave']
    onClick: WaffleHtmlProps<D>['onClick']
    tooltip: Exclude<WaffleHtmlProps<D>['tooltip'], undefined>
    testIdPrefix: WaffleHtmlProps<D>['testIdPrefix']
}

export const WaffleAreaHtml = <D extends Datum>({
    data,
    pathGenerator,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    testIdPrefix,
}: WaffleAreaHtmlProps<D>) => {
    const { handleMouseEnter, handleMouseMove, handleMouseLeave, handleClick } =
        useAreaMouseHandlers<D, HTMLElement>(
            data,
            {
                onMouseEnter,
                onMouseMove,
                onMouseLeave,
                onClick,
            },
            tooltip
        )

    return (
        <>
            {data.polygons.map((polygon, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent',
                        clipPath: `path('${pathGenerator(polygon)}')`,
                    }}
                    onMouseEnter={isInteractive ? handleMouseEnter : undefined}
                    onMouseMove={isInteractive ? handleMouseMove : undefined}
                    onMouseLeave={isInteractive ? handleMouseLeave : undefined}
                    onClick={isInteractive ? handleClick : undefined}
                    data-test-id={
                        testIdPrefix
                            ? `${testIdPrefix}.area_${data.id}.polygon_${index}`
                            : undefined
                    }
                />
            ))}
        </>
    )
}
