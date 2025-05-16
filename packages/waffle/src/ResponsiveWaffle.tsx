import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { WaffleSvgProps, Datum } from './types'
import { Waffle } from './Waffle'

export const ResponsiveWaffle = forwardRef(
    <D extends Datum = Datum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<WaffleSvgProps<D>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <Waffle<D> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <D extends Datum = Datum>(
    props: WithChartRef<ResponsiveProps<WaffleSvgProps<D>>, SVGSVGElement>
) => ReactElement
