import { Line } from 'd3-shape'
import { ComputedDatum, Datum, WaffleSvgProps } from './types'
import { Vertex } from '@nivo/grid'
import { useAreaMouseHandlers } from './hooks'

interface WaffleAreaProps<D extends Datum> {
    data: ComputedDatum<D>
    pathGenerator: Line<Vertex>
    isInteractive: Exclude<WaffleSvgProps<D>['isInteractive'], undefined>
    onMouseEnter: WaffleSvgProps<D>['onMouseEnter']
    onMouseMove: WaffleSvgProps<D>['onMouseMove']
    onMouseLeave: WaffleSvgProps<D>['onMouseLeave']
    onClick: WaffleSvgProps<D>['onClick']
    tooltip: Exclude<WaffleSvgProps<D>['tooltip'], undefined>
    testIdPrefix: WaffleSvgProps<D>['testIdPrefix']
}

export const WaffleArea = <D extends Datum>({
    data,
    pathGenerator,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    testIdPrefix,
}: WaffleAreaProps<D>) => {
    const { handleMouseEnter, handleMouseMove, handleMouseLeave, handleClick } =
        useAreaMouseHandlers<D, SVGPathElement>(
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
                <path
                    key={index}
                    d={pathGenerator(polygon)!}
                    fill="#000000"
                    fillOpacity={0}
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
