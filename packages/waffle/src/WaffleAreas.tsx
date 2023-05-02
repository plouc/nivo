import { ComputedDatum, Datum, SvgProps } from './types'
import { useAreaPathGenerator } from './hooks'
import { WaffleArea } from './WaffleArea'

interface WaffleAreasProps<D extends Datum> {
    data: ComputedDatum<D>[]
    isInteractive: Exclude<SvgProps<D>['isInteractive'], undefined>
    onMouseEnter: SvgProps<D>['onMouseEnter']
    onMouseMove: SvgProps<D>['onMouseMove']
    onMouseLeave: SvgProps<D>['onMouseLeave']
    onClick: SvgProps<D>['onClick']
    tooltip: Exclude<SvgProps<D>['tooltip'], undefined>
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
