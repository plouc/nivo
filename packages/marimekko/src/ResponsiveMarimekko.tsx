import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { Marimekko } from './Marimekko'
import { MarimekkoSvgProps } from './types'

export const ResponsiveMarimekko = forwardRef(
    <Datum,>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<MarimekkoSvgProps<Datum>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <Marimekko<Datum> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Datum>(
    props: WithChartRef<ResponsiveProps<MarimekkoSvgProps<Datum>>, SVGSVGElement>
) => ReactElement
