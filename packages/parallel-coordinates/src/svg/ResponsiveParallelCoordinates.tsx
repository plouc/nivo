import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { ParallelCoordinatesProps, BaseDatum, DatumGroupKeys } from '../types'
import { ParallelCoordinates } from './ParallelCoordinates'

export const ResponsiveParallelCoordinates = forwardRef(
    <Datum extends BaseDatum, GroupBy extends DatumGroupKeys<Datum> | undefined = undefined>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<ParallelCoordinatesProps<Datum, GroupBy>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <ParallelCoordinates<Datum, GroupBy>
                    {...props}
                    width={width}
                    height={height}
                    ref={ref}
                />
            )}
        </ResponsiveWrapper>
    )
) as <Datum extends BaseDatum, GroupBy extends DatumGroupKeys<Datum> | undefined = undefined>(
    props: WithChartRef<ResponsiveProps<ParallelCoordinatesProps<Datum, GroupBy>>, SVGSVGElement>
) => ReactElement
