import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { Bar } from './Bar'
import { BarDatum, BarIndex, ResponsiveBarSvgProps } from './types'

export const ResponsiveBar = forwardRef(
    <D extends BarDatum = BarDatum, I extends BarIndex = string>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: Omit<ResponsiveBarSvgProps<D, I>, 'ref'>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <Bar<D, I> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <D extends BarDatum = BarDatum, I extends BarIndex = string>(
    props: ResponsiveBarSvgProps<D, I>
) => ReactElement
