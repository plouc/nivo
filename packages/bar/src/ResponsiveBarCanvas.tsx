import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { BarDatum, BarIndex, ResponsiveBarCanvasProps } from './types'
import { BarCanvas } from './BarCanvas'

export const ResponsiveBarCanvas = forwardRef(
    <D extends BarDatum = BarDatum, I extends BarIndex = string>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: Omit<ResponsiveBarCanvasProps<D, I>, 'ref'>,
        ref: ForwardedRef<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <BarCanvas<D, I> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <D extends BarDatum = BarDatum, I extends BarIndex = string>(
    props: ResponsiveBarCanvasProps<D, I>
) => ReactElement
