import { HeatMapDataProps, HeatMapSvgProps, HeatMapCanvasProps } from '@nivo/heatmap'

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
    axisTop: SvgMappedProps['axisTop'] & { enable: boolean }
    axisRight: SvgMappedProps['axisRight'] & { enable: boolean }
    axisBottom: SvgMappedProps['axisBottom'] & { enable: boolean }
    axisLeft: SvgMappedProps['axisLeft'] & { enable: boolean }
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
    axisTop: SvgMappedProps['axisTop'] & { enable: boolean }
    axisRight: SvgMappedProps['axisRight'] & { enable: boolean }
    axisBottom: SvgMappedProps['axisBottom'] & { enable: boolean }
    axisLeft: SvgMappedProps['axisLeft'] & { enable: boolean }
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
