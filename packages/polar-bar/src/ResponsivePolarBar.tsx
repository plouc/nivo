import { forwardRef, ReactElement, Ref } from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { PolarBar } from './PolarBar'
import { PolarBarSvgProps, PolarBarDatum } from './types'

export type ResponsivePolarBarProps<RawDatum extends PolarBarDatum> = Omit<
    PolarBarSvgProps<RawDatum>,
    'width' | 'height'
>

export const InnerResponsivePolarBar = <RawDatum extends PolarBarDatum>(
    props: ResponsivePolarBarProps<RawDatum>,
    ref: Ref<SVGSVGElement>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <PolarBar<RawDatum> width={width} height={height} {...props} ref={ref} />
        )}
    </ResponsiveWrapper>
)

export const ResponsivePolarBar = forwardRef<SVGSVGElement, ResponsivePolarBarProps<any>>(
    InnerResponsivePolarBar
) as <RawDatum extends PolarBarDatum>(
    props: ResponsivePolarBarProps<RawDatum> & {
        ref?: Ref<SVGSVGElement>
    }
) => ReactElement
