import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { DefaultTreeMapDatum, TreeMapSvgProps } from './types'
import { TreeMap } from './TreeMap'

export const ResponsiveTreeMap = forwardRef(
    <Datum extends object = DefaultTreeMapDatum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<TreeMapSvgProps<Datum>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <TreeMap<Datum> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Datum extends object = DefaultTreeMapDatum>(
    props: WithChartRef<ResponsiveProps<TreeMapSvgProps<Datum>>, SVGSVGElement>
) => ReactElement
