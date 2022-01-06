import React from 'react'
import {
    ResponsiveHeatMap,
    svgDefaultProps as defaults,
} from '../../../../packages/heatmap/dist/nivo-heatmap.cjs'
import { patternLinesDef } from '@nivo/core'
import isFunction from 'lodash/isFunction'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/heatmap/meta.yml'
import mapper from '../../data/components/heatmap/mapper'
import { groups } from '../../data/components/heatmap/props'
import { generateLightDataSet } from '../../data/components/heatmap/generator'
import { graphql, useStaticQuery } from 'gatsby'

const getRandomValue = () => -100 + Math.random() * 200

const getData = () => [
    {
        id: 'japan',
        data: [
            {
                x: 'plane',
                y: getRandomValue(),
            },
            {
                x: 'helicopter',
                y: getRandomValue(),
            },
            {
                x: 'boat',
                y: getRandomValue(),
            },
            {
                x: 'train',
                y: getRandomValue(),
            },
            {
                x: 'subway',
                y: getRandomValue(),
            },
            {
                x: 'bus',
                y: getRandomValue(),
            },
            {
                x: 'car',
                y: getRandomValue(),
            },
            {
                x: 'moto',
                y: getRandomValue(),
            },
            {
                x: 'bicycle',
                y: getRandomValue(),
            },
            {
                x: 'horse',
                y: getRandomValue(),
            },
            {
                x: 'skateboard',
                y: getRandomValue(),
            },
            {
                x: 'others',
                y: getRandomValue(),
            },
        ],
    },
    {
        id: 'france',
        data: [
            {
                x: 'plane',
                y: getRandomValue(),
            },
            {
                x: 'helicopter',
                y: getRandomValue(),
            },
            {
                x: 'boat',
                y: getRandomValue(),
            },
            {
                x: 'train',
                y: getRandomValue(),
            },
            {
                x: 'subway',
                y: getRandomValue(),
            },
            {
                x: 'bus',
                y: getRandomValue(),
            },
            {
                x: 'car',
                y: getRandomValue(),
            },
            {
                x: 'moto',
                y: getRandomValue(),
            },
            {
                x: 'bicycle',
                y: getRandomValue(),
            },
            {
                x: 'horse',
                y: getRandomValue(),
            },
            {
                x: 'skateboard',
                y: getRandomValue(),
            },
            {
                x: 'others',
                y: getRandomValue(),
            },
        ],
    },
    {
        id: 'us',
        data: [
            {
                x: 'plane',
                y: getRandomValue(),
            },
            {
                x: 'helicopter',
                y: getRandomValue(),
            },
            {
                x: 'boat',
                y: getRandomValue(),
            },
            {
                x: 'train',
                y: getRandomValue(),
            },
            {
                x: 'subway',
                y: getRandomValue(),
            },
            {
                x: 'bus',
                y: getRandomValue(),
            },
            {
                x: 'car',
                y: getRandomValue(),
            },
            {
                x: 'moto',
                y: getRandomValue(),
            },
            {
                x: 'bicycle',
                y: getRandomValue(),
            },
            {
                x: 'horse',
                y: getRandomValue(),
            },
            {
                x: 'skateboard',
                y: getRandomValue(),
            },
            {
                x: 'others',
                y: getRandomValue(),
            },
        ],
    },
    {
        id: 'germany',
        data: [
            {
                x: 'plane',
                y: getRandomValue(),
            },
            {
                x: 'helicopter',
                y: getRandomValue(),
            },
            {
                x: 'boat',
                y: getRandomValue(),
            },
            {
                x: 'train',
                y: getRandomValue(),
            },
            {
                x: 'subway',
                y: getRandomValue(),
            },
            {
                x: 'bus',
                y: getRandomValue(),
            },
            {
                x: 'car',
                y: getRandomValue(),
            },
            {
                x: 'moto',
                y: getRandomValue(),
            },
            {
                x: 'bicycle',
                y: getRandomValue(),
            },
            {
                x: 'horse',
                y: getRandomValue(),
            },
            {
                x: 'skateboard',
                y: getRandomValue(),
            },
            {
                x: 'others',
                y: getRandomValue(),
            },
        ],
    },
    {
        id: 'norway',
        data: [
            {
                x: 'plane',
                y: getRandomValue(),
            },
            {
                x: 'helicopter',
                y: getRandomValue(),
            },
            {
                x: 'boat',
                y: getRandomValue(),
            },
            {
                x: 'train',
                y: getRandomValue(),
            },
            {
                x: 'subway',
                y: getRandomValue(),
            },
            {
                x: 'bus',
                y: getRandomValue(),
            },
            {
                x: 'car',
                y: getRandomValue(),
            },
            {
                x: 'moto',
                y: getRandomValue(),
            },
            {
                x: 'bicycle',
                y: getRandomValue(),
            },
            {
                x: 'horse',
                y: getRandomValue(),
            },
            {
                x: 'skateboard',
                y: getRandomValue(),
            },
            {
                x: 'others',
                y: getRandomValue(),
            },
        ],
    },
]

const initialProperties = {
    margin: {
        top: 90,
        right: 90,
        bottom: 60,
        left: 90,
    },

    minValue: defaults.minValue,
    maxValue: defaults.maxValue,
    valueFormat: { format: '>-d', enabled: true },

    forceSquare: defaults.forceSquare,
    sizeVariation: 0,
    xOuterPadding: defaults.xOuterPadding,
    xInnerPadding: 0.05,
    yOuterPadding: defaults.yOuterPadding,
    yInnerPadding: 0.05,

    enableGridX: defaults.enableGridX,
    enableGridY: defaults.enableGridY,
    axisTop: {
        enable: true,
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendOffset: 46,
    },
    axisRight: {
        enable: true,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 64,
    },
    axisBottom: {
        enable: false,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 36,
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: -64,
    },

    colors: {
        type: 'diverging',
        scheme: 'red_yellow_blue',
        divergeAt: 0.5,
        minValue: -100,
        maxValue: 100,
    },
    cellComponent: 'rect',
    cellOpacity: 1,
    activeCellOpacity: 1,
    inactiveCellOpacity: 1,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.6]],
    },

    enableLabels: true,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 2]],
    },

    defs: [
        patternLinesDef('lines', {
            background: 'inherit',
            color: 'rgba(0, 0, 0, 0.1)',
            rotation: -45,
            lineWidth: 4,
            spacing: 7,
        }),
    ],
    fill: [{ match: d => false && d.value < 30, id: 'lines' }],

    legends: [
        {
            anchor: 'bottom',
            translateX: 0,
            translateY: 30,
            length: 400,
            thickness: 8,
            direction: 'row',
            tickPosition: 'after',
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            tickFormat: Math.round,
            title: 'Value →',
            titleAlign: 'start',
            titleOffset: 4,
        },
    ],

    animate: defaults.animate,
    motionConfig: defaults.motionConfig,

    isInteractive: defaults.isInteractive,
    hoverTarget: 'cell',
}

const HeatMap = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/heatmap.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="HeatMap"
            meta={meta.HeatMap}
            icon="heatmap"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaults}
            propertiesMapper={mapper}
            codePropertiesMapper={properties => ({
                ...properties,
                cellShape: isFunction(properties.cellShape)
                    ? 'Custom(props) => (…)'
                    : properties.cellShape,
            })}
            generateData={getData}
            // getTabData={data => data.data}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveHeatMap
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={cell => {
                            logAction({
                                type: 'click',
                                label: `${cell.serieId} ${cell.data.x}: ${cell.formattedValue}`,
                                color: cell.color,
                                data: cell,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default HeatMap
