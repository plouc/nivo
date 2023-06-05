import { createElement } from 'react'
import { StreamSvgProps, StreamLayerDatum, StreamDatum } from './types'

interface StreamDotsProps<RawDatum extends StreamDatum> {
    id: string | number
    color: string
    data: StreamLayerDatum[]
    dotComponent: Exclude<StreamSvgProps<RawDatum>['dotComponent'], undefined>
    position: 'start' | 'center' | 'end'
    getSize: (datum: StreamLayerDatum) => number
    getColor: (datum: StreamLayerDatum) => string
    getBorderWidth: (datum: StreamLayerDatum) => number
    getBorderColor: (datum: StreamLayerDatum) => string
}

const getDotY = <RawDatum extends StreamDatum>(
    datum: StreamLayerDatum,
    position: StreamDotsProps<RawDatum>['position']
) => {
    let y = datum.y2
    if (position === 'center') {
        y = datum.y1 + (datum.y2 - datum.y1) / 2
    } else if (position === 'start') {
        y = datum.y1
    }

    return y
}

export const StreamDots = <RawDatum extends StreamDatum>({
    data,
    dotComponent,
    position,
    getSize,
    getColor,
    getBorderWidth,
    getBorderColor,
}: StreamDotsProps<RawDatum>) => (
    <>
        {data.map((datum, i) => {
            return createElement(dotComponent, {
                key: i,
                datum,
                x: datum.x,
                y: getDotY<RawDatum>(datum, position),
                size: getSize(datum),
                color: getColor(datum),
                borderWidth: getBorderWidth(datum),
                borderColor: getBorderColor(datum),
            })
        })}
    </>
)
