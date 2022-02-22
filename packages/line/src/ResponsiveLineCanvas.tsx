import { ResponsiveWrapper } from '@nivo/core'
import { DefaultLineDatum, LineDatum, LineCanvasProps } from './types'
import LineCanvas from './LineCanvas'

export const ResponsiveLineCanvas = <
    Datum extends LineDatum = DefaultLineDatum,
    ExtraProps extends object = Record<string, never>
>(
    props: Omit<LineCanvasProps<Datum, ExtraProps>, 'height' | 'width'>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => (
            <LineCanvas<Datum, ExtraProps> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)

// export default forwardRef(ResponsiveLineCanvas)
