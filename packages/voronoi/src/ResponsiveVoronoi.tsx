import { forwardRef, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps } from '@nivo/core'
import { VoronoiSvgProps } from './types'
import { Voronoi } from './Voronoi'

type ResponsiveVoronoiProps = ResponsiveProps<
    Partial<Omit<VoronoiSvgProps, 'data'>> & Pick<VoronoiSvgProps, 'data'>
>

export const ResponsiveVoronoi = forwardRef(
    (
        { defaultWidth, defaultHeight, onResize, debounceResize, ...props }: ResponsiveVoronoiProps,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }: { width: number; height: number }) => (
                <Voronoi {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
)
