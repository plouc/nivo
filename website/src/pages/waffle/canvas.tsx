import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ResponsiveWaffleCanvas, canvasDefaultProps, ComputedDatum, Datum } from '@nivo/waffle'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/waffle/meta.yml'
import { groups } from '../../data/components/waffle/props'
import mapper from '../../data/components/waffle/mapper'

const generateData = (): Datum[] => [
    {
        id: 'car',
        label: 'car',
        value: Math.random() * 20,
    },
    {
        id: 'walk',
        label: 'walk',
        value: Math.random() * 20,
    },
    {
        id: 'scooter',
        label: 'scooter',
        value: Math.random() * 20,
    },
    {
        id: 'bicycle',
        label: 'bicycle',
        value: Math.random() * 20,
    },
    {
        id: 'e-bicycle',
        label: 'e-bicycle',
        value: Math.random() * 20,
    },
    {
        id: 'moto',
        label: 'moto',
        value: Math.random() * 20,
    },
    {
        id: 'other',
        label: 'other',
        value: Math.random() * 20,
    },
]

const initialProperties = {
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    total: 140,

    rows: 40,
    columns: 40,
    fillDirection: 'bottom',
    padding: 0.5,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 120,
    },

    emptyColor: '#cccccc',
    emptyOpacity: 1,
    colors: { scheme: 'category10' },
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },

    animate: canvasDefaultProps.animate,
    motionConfig: canvasDefaultProps.motionConfig,

    isInteractive: true,

    legends: [
        {
            anchor: 'top-left',
            direction: 'column',
            justify: false,
            translateX: -100,
            translateY: 0,
            itemsSpacing: 4,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            itemTextColor: '#777',
            symbolSize: 20,
            onClick: (datum: ComputedDatum<Datum>) => {
                alert(JSON.stringify(datum, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                        itemBackground: '#f7fafb',
                    },
                },
            ],
        },
    ],
}

const WaffleCanvas = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/waffle-canvas.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="WaffleCanvas"
            meta={meta.WaffleCanvas}
            icon="waffle"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            propertiesMapper={mapper}
            initialProperties={initialProperties}
            defaultProperties={canvasDefaultProps}
            codePropertiesMapper={properties => ({
                ...properties,
                cellComponent: properties.cellComponent ? 'CustomCell(props) => (…)' : undefined,
                tooltip: properties.tooltip ? 'CustomTooltip(props) => (…)' : undefined,
            })}
            generateData={generateData}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveWaffleCanvas
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={(datum: ComputedDatum<Datum>) => {
                            logAction({
                                type: 'click',
                                label: `[datum] ${datum.label}`,
                                color: datum.color,
                                data: datum,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default WaffleCanvas
