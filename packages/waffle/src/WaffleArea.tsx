import { Line } from 'd3-shape'
import { ComputedDatum, Datum, SvgProps } from './types'
import { Vertex } from './polygons'
import { useAreaMouseHandlers } from './hooks'

interface WaffleAreaProps<D extends Datum> {
    data: ComputedDatum<D>
    pathGenerator: Line<Vertex>
    isInteractive: Exclude<SvgProps<D>['isInteractive'], undefined>
    onMouseEnter: SvgProps<D>['onMouseEnter']
    onMouseMove: SvgProps<D>['onMouseMove']
    onMouseLeave: SvgProps<D>['onMouseLeave']
    onClick: SvgProps<D>['onClick']
    tooltip: Exclude<SvgProps<D>['tooltip'], undefined>
    testIdPrefix: SvgProps<D>['testIdPrefix']
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
