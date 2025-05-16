import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { Sunburst } from './Sunburst'
import { SunburstSvgProps } from './types'

type ResponsiveSunburstProps<RawDatum> = ResponsiveProps<
    Partial<Omit<SunburstSvgProps<RawDatum>, 'data' | 'width' | 'height'>> &
        Pick<SunburstSvgProps<RawDatum>, 'data'>
>

export const ResponsiveSunburst = forwardRef(
    <RawDatum,>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveSunburstProps<RawDatum>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <Sunburst<RawDatum> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <RawDatum>(
    props: WithChartRef<ResponsiveSunburstProps<RawDatum>, SVGSVGElement>
) => ReactElement
