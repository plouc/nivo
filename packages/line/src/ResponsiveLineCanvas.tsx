import { ForwardedRef, forwardRef } from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { LineCanvasProps, LineSeries } from './types'
import { LineCanvas } from './LineCanvas'

export type ResponsiveLineCanvasProps<Series extends LineSeries> = Omit<
    LineCanvasProps<Series>,
    'height' | 'width'
>

const ResponsiveLineCanvasWithRef = <Series extends LineSeries>(
    props: ResponsiveLineCanvasProps<Series>,
    ref: ForwardedRef<HTMLCanvasElement>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => (
            <LineCanvas<Series> width={width} height={height} {...props} ref={ref} />
        )}
    </ResponsiveWrapper>
)

export const ResponsiveLineCanvas = forwardRef(ResponsiveLineCanvasWithRef) as <
    Series extends LineSeries
>(
    props: ResponsiveLineCanvasProps<Series> & { ref?: ForwardedRef<HTMLCanvasElement> }
) => ReturnType<typeof ResponsiveLineCanvasWithRef>

// @ts-ignore
const l = () => {
    return (
        <ResponsiveLineCanvas
            data={[
                {
                    id: 'A',
                    data: [
                        {
                            x: 'A',
                            y: 12,
                            weight: 12,
                        },
                    ],
                    extra: true,
                },
            ]}
            xFormat={value => {
                console.log(value)

                return 'A'
            }}
            yFormat={value => {
                console.log(value)

                return 'A'
            }}
            colors={s => {
                console.log(s.extra)

                return '#f00'
            }}
            areaBaselineValue={12}
            tooltip={props => {
                console.log(props.point.serieColor)

                return <>YO</>
            }}
            onMouseEnter={(p, e) => {
                console.log(p, e)
            }}
        />
    )
}
