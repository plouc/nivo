import { ComputedDatum, Datum, WaffleSvgProps } from './types'
import { useAreaPathGenerator } from './hooks'
import { WaffleArea } from './WaffleArea'

interface WaffleAreasProps<D extends Datum> {
    data: ComputedDatum<D>[]
    isInteractive: Exclude<WaffleSvgProps<D>['isInteractive'], undefined>
    onMouseEnter: WaffleSvgProps<D>['onMouseEnter']
    onMouseMove: WaffleSvgProps<D>['onMouseMove']
    onMouseLeave: WaffleSvgProps<D>['onMouseLeave']
    onClick: WaffleSvgProps<D>['onClick']
    tooltip: Exclude<WaffleSvgProps<D>['tooltip'], undefined>
    testIdPrefix?: string
}

export const WaffleAreas = <D extends Datum>({
    data,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    testIdPrefix,
}: WaffleAreasProps<D>) => {
    const pathGenerator = useAreaPathGenerator()

    return (
        <g>
            {data.map(datum => (
                <WaffleArea<D>
                    key={datum.id}
                    data={datum}
                    pathGenerator={pathGenerator}
                    isInteractive={isInteractive}
                    onMouseEnter={onMouseEnter}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    onClick={onClick}
                    tooltip={tooltip}
                    testIdPrefix={testIdPrefix}
                />
            ))}
        </g>
    )
}
