import { Meta } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { generateWinesTastes } from '@nivo/generators'
import { ClosedCurveFactoryId, patternDotsDef, patternSquaresDef } from '@nivo/core'
// @ts-ignore
import { Radar, GridLabelProps } from '../src'

export default {
    component: Radar,
    title: 'Radar',
    decorators: [withKnobs],
} as Meta

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 80, bottom: 20, left: 80 },
    ...generateWinesTastes(),
    indexBy: 'taste',
    animate: true,
}

const curveOptions: ClosedCurveFactoryId[] = [
    'linearClosed',
    'basisClosed',
    'catmullRomClosed',
    'cardinalClosed',
]

export const Default = () => <Radar {...commonProperties} />

export const WithCustomCurve = () => (
    <Radar {...commonProperties} gridShape="linear" curve="catmullRomClosed" />
)

export const LinearGridShape = () => (
    <Radar
        {...commonProperties}
        gridShape="linear"
        curve={select<ClosedCurveFactoryId>('curve', curveOptions, 'linearClosed')}
    />
)

export const WithDotLabel = () => (
    <Radar
        {...commonProperties}
        curve={select<ClosedCurveFactoryId>('curve', curveOptions, 'linearClosed')}
        gridShape="linear"
        dotSize={10}
        dotBorderColor="#fff"
        dotBorderWidth={2}
        enableDotLabel={true}
        gridLabelOffset={36}
    />
)

export const AbusingDots = () => (
    <Radar
        {...commonProperties}
        curve={select('curve', curveOptions, 'catmullRomClosed')}
        dotSize={32}
        enableDotLabel={true}
        dotLabelYOffset={3}
        gridLabelOffset={36}
    />
)

const CustomSymbol = ({
    size,
    color,
    borderWidth,
    borderColor,
}: {
    size: number
    color: string
    borderWidth: number
    borderColor: string
}) => (
    <rect
        transform={`rotate(45) translate(${size * -0.5}, ${size * -0.5})`}
        width={size}
        height={size}
        fill={color}
        strokeWidth={borderWidth}
        fillOpacity={1}
        stroke={borderColor}
    />
)

export const CustomDotSymbol = () => (
    <Radar
        {...commonProperties}
        curve={select('curve', curveOptions, 'catmullRomClosed')}
        dotSize={18}
        dotSymbol={CustomSymbol}
        dotBorderWidth={1}
        dotBorderColor="inherit:darker(0.3)"
        gridLabelOffset={36}
    />
)

export const WithFormattedValues = () => (
    <Radar
        {...commonProperties}
        valueFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
)

export const WithFormattedValuesPerKey = () => (
    <Radar
        {...commonProperties}
        valueFormat={(value, key) => {
            if (key === 'syrah') {
                return value + ' BitCoins'
            } else {
                return `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        }}
    />
)

const LabelComponent = ({ id, x, y, anchor }: GridLabelProps) => (
    <g transform={`translate(${x}, ${y})`}>
        <g transform={`translate(${anchor === 'end' ? -60 : anchor === 'middle' ? -30 : 0}, -20)`}>
            <text>{id}</text>
            <text
                y={24}
                style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    fill: '#3a9896',
                }}
            >
                +{Math.round(Math.random() * 100)}%
            </text>
        </g>
    </g>
)

export const CustomLabelComponent = () => <Radar {...commonProperties} gridLabel={LabelComponent} />

export const CustomLegendLabel = () => (
    <Radar
        {...commonProperties}
        legends={[
            {
                data: commonProperties.keys.map(key => ({ id: key, label: `${key} base` })),
                anchor: 'top-left',
                direction: 'column',
                itemWidth: 56,
                itemHeight: 12,
                itemsSpacing: 12,
                itemTextColor: '#333',
                symbolSize: 6,
                symbolShape: 'circle',
            },
        ]}
    />
)

export const WithPatterns = () => (
    <Radar
        {...commonProperties}
        defs={[
            patternDotsDef('dots', {
                background: '#fc0341',
                color: 'inherit',
                size: 4,
                padding: 2,
                stagger: true,
            }),
            patternSquaresDef('squares', {
                background: '#4287f5',
                color: 'inherit',
                size: 6,
                padding: 4,
                stagger: false,
            }),
        ]}
        fill={[
            {
                match: node => node.key === commonProperties.keys[0],
                id: 'dots',
            },
            {
                match: node => node.key === commonProperties.keys[1],
                id: 'squares',
            },
        ]}
    />
)
