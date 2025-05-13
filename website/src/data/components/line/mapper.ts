import { LineSvgProps, LineCanvasProps } from '@nivo/line'
import { settingsMapper, UnmappedSettings } from '../../../lib/settings'
import { mapAxis, mapFormat, mapLegends } from '../../../lib/property-mappers'
import { LineSampleSeries } from './generator'

export type MappedLineSvgProps = Omit<LineSvgProps<LineSampleSeries>, 'data' | 'width' | 'height'>
export type UnmappedLineSvgProps = UnmappedSettings<
    MappedLineSvgProps,
    {
        xFormat: {
            format: string
            enabled: boolean
        }
        yFormat: {
            format: string
            enabled: boolean
        }
        axisTop: { enable: boolean } & MappedLineSvgProps['axisTop']
        axisRight: { enable: boolean } & MappedLineSvgProps['axisRight']
        axisBottom: { enable: boolean } & MappedLineSvgProps['axisBottom']
        axisLeft: { enable: boolean } & MappedLineSvgProps['axisLeft']
        pointLabel: string
    }
>

export type MappedLineCanvasProps = Omit<
    LineCanvasProps<LineSampleSeries>,
    'data' | 'width' | 'height'
>
export type UnmappedLineCanvasProps = UnmappedSettings<
    MappedLineCanvasProps,
    {
        xFormat: {
            format: string
            enabled: boolean
        }
        yFormat: {
            format: string
            enabled: boolean
        }
        axisTop: { enable: boolean } & MappedLineCanvasProps['axisTop']
        axisRight: { enable: boolean } & MappedLineCanvasProps['axisRight']
        axisBottom: { enable: boolean } & MappedLineCanvasProps['axisBottom']
        axisLeft: { enable: boolean } & MappedLineCanvasProps['axisLeft']
    }
>

export const svgMapper = settingsMapper<UnmappedLineSvgProps, MappedLineSvgProps>({
    xFormat: mapFormat,
    yFormat: mapFormat,
    axisTop: mapAxis,
    axisRight: mapAxis,
    axisBottom: mapAxis,
    axisLeft: mapAxis,
    pointLabel: value => {
        if (value === `d => \`\${d.x}: \${d.y}\``) return d => `${d.data.x}: ${d.data.y}`
        return `data.${value}`
    },
    legends: mapLegends,
})

export const canvasMapper = svgMapper as ReturnType<
    typeof settingsMapper<UnmappedLineCanvasProps, MappedLineCanvasProps>
>
