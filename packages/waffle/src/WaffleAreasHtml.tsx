import { Margin } from '@nivo/core'
import { ComputedDatum, Datum, WaffleHtmlProps } from './types'
import { useAreaPathGenerator } from './hooks'
import { WaffleAreaHtml } from './WaffleAreaHtml'

interface WaffleAreasHtmlProps<D extends Datum> {
    data: ComputedDatum<D>[]
    margin: Margin
    isInteractive: Exclude<WaffleHtmlProps<D>['isInteractive'], undefined>
    onMouseEnter: WaffleHtmlProps<D>['onMouseEnter']
    onMouseMove: WaffleHtmlProps<D>['onMouseMove']
    onMouseLeave: WaffleHtmlProps<D>['onMouseLeave']
    onClick: WaffleHtmlProps<D>['onClick']
    tooltip: Exclude<WaffleHtmlProps<D>['tooltip'], undefined>
    testIdPrefix: WaffleHtmlProps<D>['testIdPrefix']
}

export const WaffleAreasHtml = <D extends Datum>({
    data,
    margin,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    testIdPrefix,
}: WaffleAreasHtmlProps<D>) => {
    const pathGenerator = useAreaPathGenerator()

    return (
        <div
            style={{
                position: 'absolute',
                top: margin.top,
                left: margin.left,
                width: '100%',
                height: '100%',
            }}
        >
            {data.map(datum => (
                <WaffleAreaHtml<D>
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
        </div>
    )
}
