import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { LineCanvasProps, LineSeries } from './types'
import { LineCanvas } from './LineCanvas'

export type ResponsiveLineCanvasProps<Series extends LineSeries> = Omit<
    LineCanvasProps<Series>,
    'width' | 'height'
>

function InnerResponsiveLineCanvas<Series extends LineSeries>(
    props: ResponsiveLineCanvasProps<Series>,
    ref: Ref<HTMLCanvasElement>
) {
    return (
        <ResponsiveWrapper>
            {({ width, height }: { width: number; height: number }) => (
                <LineCanvas<Series> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
}

export const ResponsiveLineCanvas = forwardRef<HTMLCanvasElement, ResponsiveLineCanvasProps<any>>(
    InnerResponsiveLineCanvas
) as <Series extends LineSeries>(
    props: ResponsiveLineCanvasProps<Series> & {
        ref?: Ref<HTMLCanvasElement>
    }
) => ReactElement
