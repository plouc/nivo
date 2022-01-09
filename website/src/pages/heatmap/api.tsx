import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { svgDefaultProps as defaults } from '@nivo/heatmap'
import { Seo } from '../../components/Seo'
import { ApiClient } from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/heatmap/props'
import mapper from '../../data/components/heatmap/mapper'
import { getLightData } from '../../data/components/heatmap/generator'
import meta from '../../data/components/heatmap/meta.yml'

const HeatMapApi = () => {
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

    const data = useMemo(() => getLightData(), [])

    return (
        <>
            <Seo
                title="HeatMap HTTP API"
                image={image}
                keywords={[...meta.HeatMap.tags, 'HTTP API']}
            />
            <ApiClient
                componentName="HeatMap"
                chartClass="heatmap"
                apiPath="/charts/heatmap"
                flavors={meta.flavors}
                dataProperty="data"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 800,
                    height: 600,
                    data: JSON.stringify(data, null, '  '),
                    margin: {
                        top: 100,
                        right: 60,
                        bottom: 30,
                        left: 60,
                    },
                    valueFormat: { format: '>-.2s', enabled: true },
                    forceSquare: defaults.forceSquare,
                    sizeVariation: defaults.sizeVariation,
                    xOuterPadding: defaults.xOuterPadding,
                    xInnerPadding: defaults.xInnerPadding,
                    yOuterPadding: defaults.yOuterPadding,
                    yInnerPadding: defaults.yInnerPadding,
                    colors: {
                        type: 'diverging',
                        scheme: 'red_yellow_blue',
                        divergeAt: 0.5,
                        minValue: -100_000,
                        maxValue: 100_000,
                    },
                    emptyColor: '#555555',
                    enableGridX: false,
                    enableGridY: true,
                    axisTop: {
                        enable: true,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -55,
                        legend: '',
                        legendOffset: 36,
                    },
                    axisRight: {
                        enable: false,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'middle',
                        legendOffset: 0,
                    },
                    axisBottom: {
                        enable: false,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'middle',
                        legendOffset: 36,
                    },
                    axisLeft: {
                        enable: true,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'middle',
                        legendOffset: -40,
                    },
                    cellComponent: defaults.cellComponent,
                    borderRadius: defaults.borderRadius,
                    opacity: defaults.opacity,
                    borderWidth: defaults.borderWidth,
                    borderColor: {
                        from: 'color',
                        modifiers: [['darker', 0.4]],
                    },
                    enableLabels: true,
                    labelTextColor: {
                        from: 'color',
                        modifiers: [['darker', 1.4]],
                    },
                    legends: [],
                    annotations: [],
                }}
            />
        </>
    )
}

export default HeatMapApi
