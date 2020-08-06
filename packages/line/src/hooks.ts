/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { area, line, CurveFactory } from 'd3-shape'
import { 
  curveFromProp,
  useTheme,
  useValueFormatter,
  Box,
  Theme,
  DataFormatter,
  DatumValue as CoreDatumValue,
  CartesianMarkerSpec,
  CurveInterpolationId,
  Dimensions
} from '@nivo/core'
import { LegendProps } from '@nivo/legends'
import { AxisProps, GridValues } from '@nivo/axes'
import { CrosshairType } from '@nivo/tooltip'
import { useInheritedColor, useOrdinalColorScale, OrdinalColorScale, InheritedColorGenerator } from '@nivo/colors'
import { computeXYScalesForSeries, ScaleOptions, Scale, ScaleFunc } from '@nivo/scales'
import { LineDefaultProps } from './props'
import { ResponsiveLineProps } from './ResponsiveLine'
import { SliceTooltipProps } from './SliceTooltip'
import { PointTooltipProps } from './PointTooltip'
import { LineProps } from './Line'

export type DatumValue = CoreDatumValue

export interface Datum {
  x: DatumValue | null
  y: DatumValue | null
  [key: string]: any
}
export interface ComputedDatum {
  data: Datum
  position: {
    x: number
    y: number
  }
}

export interface Serie {
  id: string | number
  data: Datum[]
  [key: string]: any
}
export interface ComputedSerie {
  id: string | number
  data: ComputedDatum[]
  color?: string
  [key: string]: any
}

export type LineLayerType =
  | 'grid'
  | 'markers'
  | 'axes'
  | 'areas'
  | 'crosshair'
  | 'lines'
  | 'slices'
  | 'points'
  | 'mesh'
  | 'legends'

export type LineGenerator = (data: Datum[]) => string | null

export type Curve = CurveInterpolationId

export interface CustomLayerProps extends Omit<ResponsiveLineProps, 'xScale' | 'yScale'> {
  innerHeight: number
  innerWidth: number
  lineGenerator: LineGenerator
  points: Point[]
  series: ComputedSerie[]
  xScale: Scale
  yScale: Scale
}

export type CustomLayer = (props: CustomLayerProps) => React.ReactNode
export type Layer = LineLayerType | CustomLayer

export interface Point {
  id: string
  index: number
  serieId: string | number
  serieColor: string
  x: number
  y: number
  color: string
  borderColor: string
  data: {
    x: DatumValue
    xFormatted: string | number
    y: DatumValue
    yFormatted: string | number
    yStacked?: number
  }
}

export type AccessorFunc = (datum: Point['data']) => string

export type PointMouseHandler = (point: Point, event: React.MouseEvent) => void

export interface Slice {
  id: DatumValue
  height: number
  width: number
  x0: number
  x: number
  y0: number
  y: number
  points: Point[]
}

export interface PointSymbolProps {
  borderColor: string
  borderWidth: number
  color: string
  datum: Datum
  size: number
}

export type PointSymbol = React.ComponentClass<PointSymbolProps>

export interface LineBaseProps {
  data: Serie[]
  xScale?: ScaleOptions
  xFormat?: string | DataFormatter
  yScale?: ScaleOptions
  yFormat?: string | DataFormatter
  layers?: Layer[]
  margin?: Box
  curve?: Curve
  lineWidth?: number
  colors?: OrdinalColorScale<ComputedSerie>
  theme?: Theme
  axisTop?: AxisProps
  axisRight?: AxisProps
  axisBottom?: AxisProps
  axisLeft?: AxisProps
  enableGridX?: boolean
  gridXValues?: GridValues<DatumValue>
  enableGridY?: boolean
  gridYValues?: GridValues<DatumValue>
  enablePoints?: boolean
  pointSymbol?: PointSymbol
  pointSize?: number
  pointColor?: any
  pointBorderWidth?: number
  pointBorderColor?: any
  enableArea?: boolean
  areaOpacity?: number
  areaBaselineValue?: DatumValue
  markers?: CartesianMarkerSpec<number>[]
  isInteractive?: boolean
  onMouseEnter?: PointMouseHandler
  onMouseMove?: PointMouseHandler
  onMouseLeave?: PointMouseHandler
  onClick?: PointMouseHandler
  debugMesh?: boolean
  enableSlices?: 'x' | 'y' | false
  debugSlices?: boolean
  sliceTooltip?: React.ComponentClass<SliceTooltipProps>
  tooltipFormat?: DataFormatter | string
  tooltip?: React.ComponentClass<PointTooltipProps>
  enableCrosshair?: boolean
  crosshairType?: CrosshairType
  legends?: LegendProps[]
}

export const useLineGenerator = ({
  curve
}: {
  curve: Curve
}): LineGenerator => {
  return useMemo(
    () =>
      line<any>()
        .defined((d) => d.x !== null && d.y !== null)
        .x((d) => d.x)
        .y((d) => d.y)
        .curve(curveFromProp(curve)),
    [curve]
  )
}

const useAreaGenerator = ({
  curve,
  yScale,
  areaBaselineValue
}: {
  curve: Curve
  yScale: ScaleFunc
  areaBaselineValue: DatumValue
}) => {
  return useMemo(() => {
    return area<any>()
      .defined((d) => d.x !== null && d.y !== null)
      .x((d) => d.x)
      .y1((d) => d.y)
      .curve(curveFromProp(curve) as CurveFactory)
      .y0(yScale(areaBaselineValue))
  }, [curve, yScale, areaBaselineValue])
}

const usePoints = ({ series, getPointColor, getPointBorderColor, formatX, formatY }: {
  series: ComputedSerie[],
  getPointColor: InheritedColorGenerator<any>,
  getPointBorderColor: InheritedColorGenerator<any>,
  formatX: any,
  formatY: any
}): Point[] => {
    return useMemo(() => {
        return series.reduce((acc, serie) => {
            return [
                ...acc,
                ...serie.data
                    .filter(datum => datum.position.x !== null && datum.position.y !== null)
                    .map((datum, i) => {
                        const point: Partial<Point> = {
                            id: `${serie.id}.${i}`,
                            index: acc.length + i,
                            serieId: serie.id,
                            serieColor: serie.color,
                            x: datum.position.x,
                            y: datum.position.y,
                        }
                        point.color = getPointColor(serie)
                        point.borderColor = getPointBorderColor(point)
                        point.data = {
                            ...datum.data,
                            xFormatted: formatX(datum.data.x),
                            yFormatted: formatY(datum.data.y),
                        }

                        return point
                    }),
            ]
        }, [])
    }, [series, getPointColor, getPointBorderColor, formatX, formatY])
}

interface UseSlicesProps extends Dimensions {
  enableSlices: 'x' | 'y' | false
  points: Point[]
}

export const useSlices = ({
  enableSlices,
  points,
  width,
  height
}: UseSlicesProps): Slice[] => {
    return useMemo(() => {
        if (enableSlices === false) return []

        if (enableSlices === 'x') {
            const map = new Map()
            points.forEach(point => {
                if (point.data.x === null || point.data.y === null) return
                if (!map.has(point.x)) map.set(point.x, [point])
                else map.get(point.x).push(point)
            })
            return Array.from(map.entries())
                .sort((a, b) => a[0] - b[0])
                .map(([x, slicePoints], i, slices) => {
                    const prevSlice = slices[i - 1]
                    const nextSlice = slices[i + 1]

                    let x0
                    if (!prevSlice) x0 = x
                    else x0 = x - (x - prevSlice[0]) / 2

                    let sliceWidth
                    if (!nextSlice) sliceWidth = width - x0
                    else sliceWidth = x - x0 + (nextSlice[0] - x) / 2

                    return {
                        id: x,
                        x0,
                        x,
                        y0: 0,
                        y: 0,
                        width: sliceWidth,
                        height,
                        points: slicePoints.reverse(),
                    }
                })
        } else if (enableSlices === 'y') {
            const map = new Map()
            points.forEach(point => {
                if (point.data.x === null || point.data.y === null) return
                if (!map.has(point.y)) map.set(point.y, [point])
                else map.get(point.y).push(point)
            })
            return Array.from(map.entries())
                .sort((a, b) => a[0] - b[0])
                .map(([y, slicePoints], i, slices) => {
                    const prevSlice = slices[i - 1]
                    const nextSlice = slices[i + 1]

                    let y0
                    if (!prevSlice) y0 = y
                    else y0 = y - (y - prevSlice[0]) / 2

                    let sliceHeight
                    if (!nextSlice) sliceHeight = height - y0
                    else sliceHeight = y - y0 + (nextSlice[0] - y) / 2

                    return {
                        id: y,
                        x0: 0,
                        x: 0,
                        y0,
                        y,
                        width,
                        height: sliceHeight,
                        points: slicePoints.reverse(),
                    }
                })
        }
    }, [enableSlices, points])
}

export const useLine = ({
    data,
    xScale: xScaleSpec = LineDefaultProps.xScale,
    xFormat,
    yScale: yScaleSpec = LineDefaultProps.yScale,
    yFormat,
    width,
    height,
    colors = LineDefaultProps.colors,
    curve = LineDefaultProps.curve,
    areaBaselineValue = LineDefaultProps.areaBaselineValue,
    pointColor = LineDefaultProps.pointColor,
    pointBorderColor = LineDefaultProps.pointBorderColor,
    enableSlices = LineDefaultProps.enableSlices,
}: Pick<LineProps, 'data' | 'xScale' | 'xFormat' | 'yScale' | 'yFormat' | 'colors' | 'width' | 'height' | 'curve' | 'areaBaselineValue' | 'pointColor' | 'pointBorderColor' | 'enableSlices'>) => {
    const formatX = useValueFormatter(xFormat)
    const formatY = useValueFormatter(yFormat)
    const getColor = useOrdinalColorScale(colors, 'id')
    const theme = useTheme()
    const getPointColor = useInheritedColor(pointColor, theme)
    const getPointBorderColor = useInheritedColor(pointBorderColor, theme)

    const { xScale, yScale, series: rawSeries }: {
      xScale: ScaleFunc,
      yScale: ScaleFunc,
      series: ComputedSerie[]
    } = useMemo(
        () => computeXYScalesForSeries(data, xScaleSpec, yScaleSpec, width, height),
        [data, xScaleSpec, yScaleSpec, width, height]
    )

    const series: ComputedSerie[] = useMemo(
        () =>
            rawSeries.map(serie => ({
                ...serie,
                color: getColor(serie),
            })),
        [rawSeries, getColor]
    )

    const points = usePoints({
        series,
        getPointColor,
        getPointBorderColor,
        formatX,
        formatY,
    })

    const slices = useSlices({
        enableSlices,
        points,
        width,
        height,
    })

    const lineGenerator = useLineGenerator({ curve })
    const areaGenerator = useAreaGenerator({
        curve,
        yScale,
        areaBaselineValue,
    })

    return {
        lineGenerator,
        areaGenerator,
        getColor,
        series,
        xScale,
        yScale,
        slices,
        points,
    }
}
