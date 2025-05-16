import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { generateWaffleData } from '@nivo/generators'
import { ResponsiveWaffleCanvas, canvasDefaultProps, ComputedDatum, Datum } from '@nivo/waffle'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/waffle/meta.yml'
import { groups } from '../../data/components/waffle/props'
import {
    canvasMapper,
    UnmappedWaffleCanvasProps,
    MappedWaffleCanvasProps,
} from '../../data/components/waffle/mapper'

const initialProperties: UnmappedWaffleCanvasProps = {
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
    total: 140,
    rows: 40,
    columns: 40,
    fillDirection: canvasDefaultProps.fillDirection,
    padding: 0.5,
    valueFormat: { format: '.2f', enabled: true },
    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 120,
    },
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    colors: { scheme: 'category10' },
    borderRadius: 1,
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
        },
    ],
}

const generateData = () =>
    generateWaffleData({
        total: initialProperties.total,
        groups: [
            { id: 'car' },
            { id: 'walk' },
            { id: 'moped' },
            { id: 'bicycle' },
            { id: 'e-bicycle' },
            { id: 'motorcycle' },
            { id: 'other' },
        ],
    })

const WaffleCanvas = ({ location }: PageProps) => {
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
        <ComponentTemplate<UnmappedWaffleCanvasProps, MappedWaffleCanvasProps, any>
            name="WaffleCanvas"
            meta={meta.WaffleCanvas}
            icon="waffle"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            propertiesMapper={canvasMapper}
            initialProperties={initialProperties}
            defaultProperties={canvasDefaultProps}
            generateData={generateData}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveWaffleCanvas
                        {...properties}
                        data={data}
                        theme={theme}
                        ref={chartRef as Ref<HTMLCanvasElement>}
                        debounceResize={200}
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
