import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { Bar } from './Bar'
import { BarDatum, ResponsiveBarSvgProps } from './types'

export const ResponsiveBar = forwardRef(
    <D extends BarDatum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: Omit<ResponsiveBarSvgProps<D>, 'ref'>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => <Bar<D> {...props} width={width} height={height} ref={ref} />}
        </ResponsiveWrapper>
    )
) as <D extends BarDatum>(props: ResponsiveBarSvgProps<D>) => ReactElement
