import { settingsMapper, mapAxis, mapFormat } from '../../../lib/settings'
import { SvgUnmappedProps, SvgMappedProps } from './types'

export default settingsMapper(
    {
        valueFormat: mapFormat,
        axisTop: mapAxis('top'),
        axisRight: mapAxis('right'),
        axisBottom: mapAxis('bottom'),
        axisLeft: mapAxis('left'),
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
