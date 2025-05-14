import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import {
    AreaBumpDatum,
    AreaBumpSerieExtraProps,
    AreaBumpSvgProps,
    DefaultAreaBumpDatum,
} from './types'
import { AreaBump } from './AreaBump'

export const ResponsiveAreaBump = forwardRef(
    <
        Datum extends AreaBumpDatum = DefaultAreaBumpDatum,
        ExtraProps extends AreaBumpSerieExtraProps = Record<string, unknown>,
    >(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<AreaBumpSvgProps<Datum, ExtraProps>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <AreaBump<Datum, ExtraProps> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <
    Datum extends AreaBumpDatum = DefaultAreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps = Record<string, unknown>,
>(
    props: WithChartRef<ResponsiveProps<AreaBumpSvgProps<Datum, ExtraProps>>, SVGSVGElement>
) => ReactElement | null
