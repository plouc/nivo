import { BarSvgProps, BarCanvasProps, BarDatum } from '@nivo/bar'
import { UnmappedChartProps, chartPropsMapper} from "@/lib/charts/mapping/chartPropsMapper";
import { AxisWithToggle, mapAxis} from "@/lib/charts/mapping/axes";
// import { mapFormat, mapLegends } from '../../../lib/property-mappers'

export type MappedBarSvgProps = Omit<BarSvgProps<BarDatum>, 'data' | 'width' | 'height'>
export type UnmappedBarSvgProps = UnmappedChartProps<
    MappedBarSvgProps,
    {
        // valueFormat: {
        //     format: string
        //     enabled: boolean
        // }
        axisTop: AxisWithToggle<MappedBarSvgProps['axisTop']>
        axisRight: AxisWithToggle<MappedBarSvgProps['axisRight']>
        axisBottom: AxisWithToggle<MappedBarSvgProps['axisBottom']>
        axisLeft: AxisWithToggle<MappedBarSvgProps['axisLeft']>
        // 'custom tooltip example': boolean
    }
>

export type MappedBarCanvasProps = Omit<BarCanvasProps<BarDatum>, 'data' | 'width' | 'height'>
export type UnmappedBarCanvasProps = UnmappedChartProps<
    MappedBarCanvasProps,
    {
        // valueFormat: {
        //     format: string
        //     enabled: boolean
        // }
        axisTop: AxisWithToggle<MappedBarCanvasProps['axisTop']>
        axisRight: AxisWithToggle<MappedBarCanvasProps['axisRight']>
        axisBottom: AxisWithToggle<MappedBarCanvasProps['axisBottom']>
        axisLeft: AxisWithToggle<MappedBarCanvasProps['axisLeft']>
        // 'custom tooltip example': boolean
    }
>

/*
const TooltipWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px;
    background: #333;
    padding: 12px 16px;
    font-size: 12px;
    border-radius: 2px;
`
const TooltipKey = styled.span`
    font-weight: 600;
`
const TooltipValue = styled.span``

const CustomTooltip = ({ color, ...bar }: any) => {
    return (
        <TooltipWrapper style={{ color: color }}>
            <TooltipKey>id</TooltipKey>
            <TooltipValue>{bar.id}</TooltipValue>
            <TooltipKey>value</TooltipKey>
            <TooltipValue>{bar.value}</TooltipValue>
            <TooltipKey>formattedValue</TooltipKey>
            <TooltipValue>{bar.formattedValue}</TooltipValue>
            <TooltipKey>index</TooltipKey>
            <TooltipValue>{bar.index}</TooltipValue>
            <TooltipKey>indexValue</TooltipKey>
            <TooltipValue>{bar.indexValue}</TooltipValue>
            <TooltipKey>color</TooltipKey>
            <TooltipValue>{color}</TooltipValue>
        </TooltipWrapper>
    )
}
*/

export const barSvgPropsMapper = chartPropsMapper<UnmappedBarSvgProps, MappedBarSvgProps>({
    // valueFormat: mapFormat,
    axisTop: mapAxis,
    axisRight: mapAxis,
    axisBottom: mapAxis,
    axisLeft: mapAxis,
    // legends: mapLegends,
    // tooltip: (_value: any, values: any) => {
    //     if (!values['custom tooltip example']) return undefined
//
        //     return CustomTooltip
        // },
    },
    {
        // exclude: ['custom tooltip example'],
    }
)

export const barCanvasMapper = barSvgPropsMapper as ReturnType<
    typeof chartPropsMapper<UnmappedBarCanvasProps, MappedBarCanvasProps>
>
