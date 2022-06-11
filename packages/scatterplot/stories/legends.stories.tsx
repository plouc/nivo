import { Meta } from '@storybook/react'
import { ScatterPlot, ScatterPlotCanvas } from '../src'
import {
    SizeLegendSvg,
    renderSizeLegendToCanvas,
    BoxLegendSvg,
    renderBoxLegendToCanvas,
} from '@nivo/legends'

export default {
    component: ScatterPlot,
    title: 'Custom Legends',
} as Meta

const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 20, right: 500, bottom: 60, left: 80 },
    animate: true,
    enableSlices: 'x',
    useMesh: true,
}

const data = [
    {
        id: 'A',
        data: [
            { x: 0.5, y: 5 },
            { x: 1.0, y: 3 },
            { x: 2.0, y: 9 },
            { x: 3.5, y: 7 },
            { x: 4.5, y: 10 },
            { x: 7.0, y: 14 },
        ],
    },
]

const CustomSymbolSvg = ({ x, y, size, color, fill, borderWidth, borderColor }) => {
    return (
        <g>
            <circle
                cx={x ?? 0}
                cy={y ?? 0}
                fill="#fff"
                r={size / 2}
                strokeWidth={borderWidth}
                stroke={borderColor ?? color ?? fill}
            />
            <circle
                cx={x ?? 0}
                cy={y ?? 0}
                r={size / 4}
                strokeWidth={borderWidth}
                stroke={borderColor ?? color ?? fill}
                fill={color ?? fill}
                fillOpacity={0.65}
            />
        </g>
    )
}

const CustomSymbolCanvas = (
    ctx,
    { x, y, size, fill, opacity = 1, borderWidth = 0, borderColor }
) => {
    ctx.save()
    ctx.globalAlpha = opacity
    ctx.lineWidth = borderWidth
    // outer circle
    ctx.beginPath()
    ctx.arc(x, y, size / 2, 0, 2 * Math.PI)
    ctx.strokeStyle = borderColor ?? fill ?? 'black'
    ctx.closePath()
    ctx.stroke()
    // inner circle
    ctx.beginPath()
    ctx.arc(x, y, size / 4, 0, 2 * Math.PI)
    ctx.fillStyle = fill ?? 'black'
    ctx.fill()
    ctx.restore()
}

const nivoColors = ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb', '#97e3d5']

// custom legends specifications
const legendWithCustomSymbols = {
    anchor: 'top-right',
    direction: 'column',
    translateX: 480,
    translateY: -2,
    itemWidth: 80,
    itemHeight: 26,
    symbolSize: 20,
    symbolBorderWidth: 1,
    symbolBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    title: 'Custom symbols',
    symbolShape: CustomSymbolSvg,
    data: [
        {
            id: 'A',
            label: 'Alpha',
            color: nivoColors[0],
        },
        {
            id: 'B',
            label: 'Beta',
            color: nivoColors[1],
        },
        {
            id: 'C',
            label: 'Gamma',
            color: nivoColors[2],
        },
        {
            id: 'D',
            label: 'Delta',
            color: nivoColors[3],
        },
        {
            id: 'E',
            label: 'Epsilon',
            color: nivoColors[4],
        },
    ],
}
const legendWithDifferentSymbols = {
    anchor: 'top-right',
    direction: 'column',
    translateY: 0,
    translateX: 120,
    itemWidth: 80,
    itemHeight: 22,
    symbolSize: 16,
    symbolBorderWidth: 1,
    symbolBorderColor: '#000000',
    symbolShape: 'square',
    data: [
        {
            id: 'A',
            label: 'Alpha',
            color: nivoColors[0],
            symbol: 'circle',
        },
        {
            id: 'B',
            label: 'Beta',
            color: nivoColors[1],
            symbol: 'square',
        },
        {
            id: 'C',
            label: 'Gamma',
            color: nivoColors[2],
            symbol: 'triangle',
        },
        {
            id: 'D',
            label: 'Delta',
            color: nivoColors[3],
            symbol: 'invertedTriangle',
        },
        {
            id: 'E',
            label: 'Epsilon',
            color: nivoColors[4],
            symbol: 'diamond',
        },
    ],
}
const legendWithNumericSizes = {
    anchor: 'bottom-right',
    direction: 'column',
    translateY: 0,
    translateX: 120,
    itemsSpacing: 6,
    itemWidth: 80,
    itemHeight: 22,
    symbolSize: 16,
    symbolSpacing: 50,
    symbolBorderWidth: 1,
    symbolBorderColor: '#555555',
    symbolShape: 'circle',
    data: [
        {
            id: 'A',
            label: 5,
            color: '#dddddd',
            symbol: 'circle',
            size: 3 * Math.sqrt(5),
        },
        {
            id: 'B',
            label: 20,
            color: '#dddddd',
            symbol: 'circle',
            size: 3 * Math.sqrt(20),
        },
        {
            id: 'C',
            label: 80,
            color: '#dddddd',
            symbol: 'circle',
            size: 3 * Math.sqrt(80),
        },
        {
            id: 'D',
            label: 320,
            color: '#dddddd',
            symbol: 'circle',
            size: 3 * Math.sqrt(320),
        },
    ],
}
const legendWithDiscreteSizes = {
    anchor: 'bottom-right',
    direction: 'column',
    translateY: 0,
    translateX: 480,
    itemsSpacing: 6,
    itemWidth: 80,
    itemHeight: 22,
    symbolSize: 16,
    symbolSpacing: 24,
    symbolBorderWidth: 1,
    symbolBorderColor: '#222222',
    symbolShape: 'square',
    data: [
        {
            id: 'A',
            label: 'small',
            color: '#bbbbbb',
            symbol: 'square',
            size: 2 * Math.sqrt(5),
        },
        {
            id: 'B',
            label: 'medium',
            color: '#bbbbbb',
            symbol: 'square',
            size: 2 * Math.sqrt(50),
        },
        {
            id: 'C',
            label: 'large',
            color: '#bbbbbb',
            symbol: 'square',
            size: 2 * Math.sqrt(500),
        },
    ],
}

// custom layers that display a box legend
const customBoxLegendSvg = legendSpec => {
    return props => {
        return (
            <BoxLegendSvg
                {...legendSpec}
                containerWidth={props.innerWidth}
                containerHeight={props.innerHeight}
            />
        )
    }
}
const customBoxLegendCanvas = legendSpec => {
    return (ctx, { theme, ...props }) => {
        renderBoxLegendToCanvas(ctx, {
            ...legendSpec,
            containerWidth: props.innerWidth,
            containerHeight: props.innerHeight,
            theme,
        })
    }
}

// custom layers that displays a size legend
const customSizeLegendSvg = legendSpec => {
    return props => {
        return (
            <SizeLegendSvg
                {...legendSpec}
                containerWidth={props.innerWidth}
                containerHeight={props.innerHeight}
            />
        )
    }
}
const customSizeLegendCanvas = legendSpec => {
    return (ctx, { theme, ...props }) => {
        renderSizeLegendToCanvas(ctx, {
            ...legendSpec,
            containerWidth: props.innerWidth,
            containerHeight: props.innerHeight,
            theme,
        })
    }
}

export const SvgBoxLegends = () => (
    <ScatterPlot
        {...commonProperties}
        data={data}
        layers={[
            'grid',
            'axes',
            'nodes',
            'mesh',
            customBoxLegendSvg({
                ...legendWithDifferentSymbols,
                translateX: 120,
                symbolBorderWidth: 0,
                title: 'No border',
            }),
            customBoxLegendSvg({
                ...legendWithDifferentSymbols,
                translateX: 240,
                symbolBorderWidth: 1,
                symbolBorderColor: '#444444',
                title: 'Gray border',
            }),
            customBoxLegendSvg({
                ...legendWithDifferentSymbols,
                translateX: 360,
                symbolBorderWidth: 1,
                symbolBorderColor: {
                    from: 'color',
                    modifiers: [['darker', 0.3]],
                },
                title: 'Color border',
            }),
            customBoxLegendSvg({
                ...legendWithCustomSymbols,
                symbolShape: CustomSymbolSvg,
            }),
            customSizeLegendSvg({
                ...legendWithNumericSizes,
                title: 'Size',
                symbolSpacing: 28,
                itemWidth: 80,
                itemHeight: 16,
                direction: 'column',
                translateX: 120,
            }),
            customSizeLegendSvg({
                ...legendWithNumericSizes,
                title: 'Size:',
                itemWidth: 16,
                symbolSpacing: 28,
                itemHeight: 16,
                direction: 'row',
                translateX: 330,
                translateY: -38,
                itemDirection: 'top-to-bottom',
                symbolBorderWidth: 0,
            }),
            customSizeLegendSvg({
                ...legendWithDiscreteSizes,
            }),
        ]}
    />
)

export const CanvasBoxLegends = () => (
    <ScatterPlotCanvas
        {...commonProperties}
        data={data}
        layers={[
            'grid',
            'axes',
            'nodes',
            'mesh',
            customBoxLegendCanvas({
                ...legendWithDifferentSymbols,
                translateX: 120,
                symbolBorderWidth: 0,
                title: 'No border',
            }),
            customBoxLegendCanvas({
                ...legendWithDifferentSymbols,
                translateX: 240,
                symbolBorderWidth: 1,
                symbolBorderColor: '#444444',
                title: 'Gray border',
            }),
            customBoxLegendCanvas({
                ...legendWithDifferentSymbols,
                translateX: 360,
                symbolBorderWidth: 1,
                symbolBorderColor: {
                    from: 'color',
                    modifiers: [['darker', 0.3]],
                },
                title: 'Color border',
            }),
            customBoxLegendCanvas({
                ...legendWithCustomSymbols,
                symbolShape: CustomSymbolCanvas,
            }),
            customSizeLegendCanvas({
                ...legendWithNumericSizes,
                title: 'Size',
                symbolSpacing: 28,
                itemWidth: 80,
                itemHeight: 16,
                direction: 'column',
                translateX: 120,
            }),
            customSizeLegendCanvas({
                ...legendWithNumericSizes,
                title: 'Size:',
                itemWidth: 16,
                symbolSpacing: 36,
                itemHeight: 16,
                direction: 'row',
                translateX: 330,
                translateY: -38,
                itemDirection: 'top-to-bottom',
                symbolBorderWidth: 0,
            }),
            customSizeLegendCanvas({
                ...legendWithDiscreteSizes,
            }),
        ]}
    />
)
