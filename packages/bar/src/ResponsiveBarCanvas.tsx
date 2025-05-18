import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { BarDatum, ResponsiveBarCanvasProps } from './types'
import { BarCanvas } from './BarCanvas'

export const ResponsiveBarCanvas = forwardRef(
    <D extends BarDatum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: Omit<ResponsiveBarCanvasProps<D>, 'ref'>,
        ref: ForwardedRef<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <BarCanvas<D> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <D extends BarDatum>(props: ResponsiveBarCanvasProps<D>) => ReactElement
