import { ResponsiveWrapper } from '@nivo/core'
import { ResponsiveDendogramSvgProps, DefaultDatum } from './types'
import { Dendogram } from './Dendogram'

export const ResponsiveDendogram = <Datum extends object = DefaultDatum>(
    props: ResponsiveDendogramSvgProps<Datum>
) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Dendogram<Datum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
