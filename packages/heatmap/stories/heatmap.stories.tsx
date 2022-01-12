import { storiesOf } from '@storybook/react'
// @ts-ignore
import { HeatMap, ComputedCell } from '../src'
// @ts-ignore
import { sampleData } from './data'
// @ts-ignore
import { CustomTooltip } from './CustomTooltip'

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data: sampleData,
}

const stories = storiesOf('HeatMap', module)

stories.add('default', () => <HeatMap<any, Record<string, unknown>> {...commonProperties} />)

stories.add('Variable Cell Size', () => (
    <HeatMap<any, Record<string, unknown>>
        {...commonProperties}
        valueFormat=">-.2s"
        cellComponent="circle"
        sizeVariation={{
            sizes: [0.6, 1],
        }}
        forceSquare
        enableGridX={true}
        enableGridY={true}
    />
))

const CustomCell = ({ cell, borderWidth }: { cell: ComputedCell<any>; borderWidth: number }) => {
    if (cell.value === null) return null

    return (
        <g transform={`translate(${cell.x}, ${cell.y})`}>
            <path
                transform={`rotate(${cell.value < 50 ? 180 : 0})`}
                fill={cell.color}
                fillOpacity={cell.opacity}
                strokeWidth={borderWidth}
                stroke={cell.borderColor}
                d={`
                M0 -${Math.round(cell.height / 2)}
                L${Math.round(cell.width / 2)} ${Math.round(cell.height / 2)}
                L-${Math.round(cell.width / 2)} ${Math.round(cell.height / 2)}
                L0 -${Math.round(cell.height / 2)}
            `}
            />
            <text
                dominantBaseline="central"
                textAnchor="middle"
                style={{ fill: cell.labelTextColor }}
                dy={cell.value < 50 ? -6 : 6}
            >
                {cell.formattedValue}
            </text>
        </g>
    )
}

stories.add('Custom Cell Component', () => (
    <HeatMap<any, Record<string, unknown>>
        {...commonProperties}
        enableGridY
        cellComponent={CustomCell}
        labelTextColor="inherit:darker(1.6)"
    />
))

stories.add('Custom Tooltip', () => (
    <HeatMap<any, Record<string, unknown>>
        {...commonProperties}
        colors={{
            type: 'quantize',
            scheme: 'cividis',
            steps: 7,
        }}
        tooltip={CustomTooltip}
        labelTextColor={{
            from: 'color',
            modifiers: [['brighter', 2.6]],
        }}
    />
))
