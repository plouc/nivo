import { forwardRef, ReactElement, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { BoxPlotDatum, BoxPlotSvgProps } from './types'
import { BoxPlot } from './BoxPlot'

export const ResponsiveBoxPlot = forwardRef(
    <RawDatum extends BoxPlotDatum>(
        props: ResponsiveProps<BoxPlotSvgProps<RawDatum>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper>
            {({ width, height }) => (
                <BoxPlot<RawDatum> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <RawDatum extends BoxPlotDatum>(
    props: WithChartRef<ResponsiveProps<BoxPlotSvgProps<RawDatum>>, SVGSVGElement>
) => ReactElement
