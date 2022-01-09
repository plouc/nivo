import { HeatMapDataProps, HeatMapSvgProps, HeatMapCanvasProps } from '@nivo/heatmap'
import { AxisWithToggle } from '../../../lib/settings'

export type Datum = {
    x: string
    y: number
}

export type ExtraProps = Record<string, never>

export type Data = HeatMapDataProps<Datum, ExtraProps>['data']

export type SvgMappedProps = Omit<HeatMapSvgProps<Datum, ExtraProps>, 'data' | 'width' | 'height'>

type LegendProps = NonNullable<SvgMappedProps['legends']>[number]

export type SvgUnmappedProps = Omit<
    SvgMappedProps,
    'valueFormat' | 'axisTop' | 'axisRight' | 'axisBottom' | 'axisLeft' | 'legends'
> & {
    valueFormat: {
        format: string
        enabled: boolean
    }
    axisTop: AxisWithToggle<NonNullable<SvgMappedProps['axisTop']>>
    axisRight: AxisWithToggle<NonNullable<SvgMappedProps['axisRight']>>
    axisBottom: AxisWithToggle<NonNullable<SvgMappedProps['axisBottom']>>
    axisLeft: AxisWithToggle<NonNullable<SvgMappedProps['axisLeft']>>
    legends: (Omit<LegendProps, 'tickFormat'> & {
        tickFormat: {
            format: string
            enabled: boolean
        }
    })[]
}

export type SvgComponentProps = Omit<
    HeatMapSvgProps<Datum, ExtraProps>,
    'data' | 'width' | 'height'
>

export type CanvasMappedProps = Omit<
    HeatMapCanvasProps<Datum, ExtraProps>,
    'data' | 'width' | 'height'
>

export type CanvasUnmappedProps = Omit<
    CanvasMappedProps,
    'valueFormat' | 'axisTop' | 'axisRight' | 'axisBottom' | 'axisLeft' | 'legends'
> & {
    valueFormat: {
        format: string
        enabled: boolean
    }
    axisTop: AxisWithToggle<NonNullable<CanvasMappedProps['axisTop']>>
    axisRight: AxisWithToggle<NonNullable<CanvasMappedProps['axisRight']>>
    axisBottom: AxisWithToggle<NonNullable<CanvasMappedProps['axisBottom']>>
    axisLeft: AxisWithToggle<NonNullable<CanvasMappedProps['axisLeft']>>
    legends: (Omit<LegendProps, 'tickFormat'> & {
        tickFormat: {
            format: string
            enabled: boolean
        }
    })[]
}

export type CanvasComponentProps = Omit<
    HeatMapCanvasProps<Datum, ExtraProps>,
    'data' | 'width' | 'height'
>
