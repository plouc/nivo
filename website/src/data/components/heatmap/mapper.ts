import { settingsMapper } from '../../../lib/settings'
import { mapAxis, mapFormat } from '../../../lib/property-mappers'
import { SvgUnmappedProps, SvgMappedProps } from './types'

export default settingsMapper(
    {
        valueFormat: mapFormat,
        axisTop: mapAxis,
        axisRight: mapAxis,
        axisBottom: mapAxis,
        axisLeft: mapAxis,
        legends: (legends: SvgUnmappedProps['legends'][number][]): SvgMappedProps['legends'] => {
            return legends.map(legend => ({
                ...legend,
                tickFormat: mapFormat(legend.tickFormat),
            }))
        },
    },
    {
        exclude: ['enable axisTop', 'enable axisRight', 'enable axisBottom', 'enable axisLeft'],
    }
)
