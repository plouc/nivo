import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import merge from 'lodash/merge'
import { ResponsiveParallelCoordinatesCanvas, commonDefaultProps } from '@nivo/parallel-coordinates'
import { generateParallelCoordinatesData } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/parallel-coordinates/meta.yml'
import mapper from '../../data/components/parallel-coordinates/mapper'
import { groups } from '../../data/components/parallel-coordinates/props'
import variables from '../../data/components/parallel-coordinates/variables'

const lineCount = 320

const initialProperties = {
    variables,
    margin: {
        top: 50,
        right: 120,
        bottom: 50,
        left: 60,
    },
    layout: commonDefaultProps.layout,
    curve: commonDefaultProps.curve,
    colors: commonDefaultProps.colors,
    lineWidth: 1,
    lineOpacity: 0.2,
    axesPlan: commonDefaultProps.axesPlan,
    axesTicksPosition: commonDefaultProps.axesTicksPosition,
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 140,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
        },
    ],
    animate: commonDefaultProps.animate,
    motionConfig: commonDefaultProps.motionConfig,
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
}

const generateData = () => generateParallelCoordinatesData({ size: lineCount })

const ParallelCoordinatesCanvas = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(
                absolutePath: { glob: "**/src/assets/captures/parallel-coordinates-canvas.png" }
            ) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="ParallelCoordinatesCanvas"
            meta={meta.ParallelCoordinatesCanvas}
            icon="parallel-coordinates"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={commonDefaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
            getDataSize={() => lineCount}
            image={image}
        >
            {(properties, data, theme) => {
                return (
                    <ResponsiveParallelCoordinatesCanvas
                        data={data}
                        {...properties}
                        theme={merge({}, theme, {
                            axis: {
                                ticks: {
                                    line: {
                                        strokeWidth: 2,
                                        strokeLinecap: 'square',
                                    },
                                },
                                domain: {
                                    line: {
                                        strokeWidth: 2,
                                        strokeLinecap: 'square',
                                    },
                                },
                            },
                        })}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default ParallelCoordinatesCanvas
