import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import {
    BumpDatum,
    BumpSvgPropsWithSeriesMouseHandlers,
    BumpSvgPropsWithPointMouseHandlers,
    BumpSerieExtraProps,
    DefaultBumpDatum,
} from './types'
import { Bump } from './Bump'

export const ResponsiveBump = forwardRef(
    <
        Datum extends BumpDatum = DefaultBumpDatum,
        ExtraProps extends BumpSerieExtraProps = Record<string, unknown>,
    >(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }:
            | ResponsiveProps<BumpSvgPropsWithSeriesMouseHandlers<Datum, ExtraProps>>
            | ResponsiveProps<BumpSvgPropsWithPointMouseHandlers<Datum, ExtraProps>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <Bump<Datum, ExtraProps> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <
    Datum extends BumpDatum = DefaultBumpDatum,
    ExtraProps extends BumpSerieExtraProps = Record<string, unknown>,
>(
    props:
        | WithChartRef<
              ResponsiveProps<BumpSvgPropsWithSeriesMouseHandlers<Datum, ExtraProps>>,
              SVGSVGElement
          >
        | WithChartRef<
              ResponsiveProps<BumpSvgPropsWithPointMouseHandlers<Datum, ExtraProps>>,
              SVGSVGElement
          >
) => ReactElement | null
