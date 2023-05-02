import { Margin } from '@nivo/core'
import { ComputedDatum, Datum, HtmlProps } from './types'
import { useAreaPathGenerator } from './hooks'
import { WaffleAreaHtml } from './WaffleAreaHtml'

interface WaffleAreasHtmlProps<D extends Datum> {
    data: ComputedDatum<D>[]
    margin: Margin
    isInteractive: Exclude<HtmlProps<D>['isInteractive'], undefined>
    onMouseEnter: HtmlProps<D>['onMouseEnter']
    onMouseMove: HtmlProps<D>['onMouseMove']
    onMouseLeave: HtmlProps<D>['onMouseLeave']
    onClick: HtmlProps<D>['onClick']
    tooltip: Exclude<HtmlProps<D>['tooltip'], undefined>
    testIdPrefix: HtmlProps<D>['testIdPrefix']
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
