import { forwardRef, Ref, ReactElement } from 'react'
import { Bar } from './Bar'
import { BarDatum, BarSvgProps } from './types'
import { ResponsiveWrapper } from '@nivo/core'

export type ResponsiveBarSvgProps<RawDatum extends BarDatum> = Omit<
    BarSvgProps<RawDatum>,
    'height' | 'width'
>

export const InnerResponsiveBar = <RawDatum extends BarDatum>(
    props: ResponsiveBarSvgProps<RawDatum>,
    ref: Ref<SVGSVGElement>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => (
            <Bar<RawDatum> width={width} height={height} {...props} ref={ref} />
        )}
    </ResponsiveWrapper>
)

export const ResponsiveBar = forwardRef<SVGSVGElement, ResponsiveBarSvgProps<any>>(
    InnerResponsiveBar
) as <RawDatum extends BarDatum>(
    props: ResponsiveBarSvgProps<RawDatum> & {
        ref?: Ref<SVGSVGElement>
    }
) => ReactElement
