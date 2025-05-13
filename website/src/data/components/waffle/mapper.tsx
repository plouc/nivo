import { WaffleSvgProps, CanvasProps, WaffleHtmlProps } from '@nivo/waffle'
import { settingsMapper, UnmappedSettings } from '../../../lib/settings'
import { mapFormat, mapLegends } from '../../../lib/property-mappers'

export type MappedWaffleSvgProps = Omit<WaffleSvgProps, 'data' | 'width' | 'height'>
export type UnmappedWaffleSvgProps = UnmappedSettings<
    MappedWaffleSvgProps,
    {
        valueFormat: {
            format: string
            enabled: boolean
        }
    }
>

export type MappedWaffleCanvasProps = Omit<CanvasProps, 'data' | 'width' | 'height'>
export type UnmappedWaffleCanvasProps = UnmappedSettings<
    MappedWaffleCanvasProps,
    {
        valueFormat: {
            format: string
            enabled: boolean
        }
    }
>

export type MappedWaffleHtmlProps = Omit<WaffleHtmlProps, 'data' | 'width' | 'height'>
export type UnmappedWaffleHtmlProps = UnmappedSettings<
    MappedWaffleHtmlProps,
    {
        valueFormat: {
            format: string
            enabled: boolean
        }
    }
>

export const svgMapper = settingsMapper<UnmappedWaffleSvgProps, MappedWaffleSvgProps>(
    {
        valueFormat: mapFormat,
        legends: mapLegends,
    },
    {}
)

export const canvasMapper = svgMapper as ReturnType<
    typeof settingsMapper<UnmappedWaffleCanvasProps, MappedWaffleCanvasProps>
>

export const htmlMapper = svgMapper as ReturnType<
    typeof settingsMapper<UnmappedWaffleHtmlProps, MappedWaffleHtmlProps>
>
