import { ResponsiveWrapper } from '@nivo/core'
import { Line } from './Line'
import { LineSvgProps, LineSeries } from './types'

export const ResponsiveLine = <Series extends LineSeries>(
    props: Omit<LineSvgProps<Series>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Line<Series> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

// @ts-ignore
const l = () => {
    return (
        <Line
            width={400}
            height={400}
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
