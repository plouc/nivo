import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import merge from 'lodash/merge'
import {
    ResponsiveParallelCoordinatesCanvas,
    commonDefaultProps,
    ParallelCoordinatesCanvasProps,
} from '@nivo/parallel-coordinates'
import { generateParallelCoordinatesData } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/parallel-coordinates/meta.yml'
import mapper from '../../data/components/parallel-coordinates/mapper'
import { groups } from '../../data/components/parallel-coordinates/props'
import variables from '../../data/components/parallel-coordinates/variables'

const initialProperties: Pick<
    ParallelCoordinatesCanvasProps,
    | 'variables'
    | 'groupBy'
    | 'margin'
    | 'layout'
    | 'curve'
    | 'colors'
    | 'lineWidth'
    | 'lineOpacity'
    | 'axesTicksPosition'
    | 'legends'
    | 'animate'
    | 'motionConfig'
    | 'pixelRatio'
> = {
    variables,
    groupBy: 'group',
    margin: {
        top: 50,
        right: 120,
        bottom: 50,
        left: 60,
    },
    layout: commonDefaultProps.layout,
    curve: 'monotoneX',
    colors: { scheme: 'pink_yellowGreen' },
    lineWidth: 2,
    lineOpacity: 0.5,
    axesTicksPosition: commonDefaultProps.axesTicksPosition,
    legends: [
        {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 140,
            translateY: 0,
            itemsSpacing: 1,
            itemWidth: 100,
            itemHeight: 16,
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 16,
        },
    ],
    animate: commonDefaultProps.animate,
    motionConfig: commonDefaultProps.motionConfig,
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
}

const generateData = () =>
    generateParallelCoordinatesData({
        ids: [
            { id: '0' },
            { id: '1' },
            { id: '2' },
            { id: '3' },
            { id: '4' },
            { id: '5' },
            { id: '6' },
            { id: '7' },
            { id: '8' },
            { id: '9' },
            { id: '10' },
            { id: '11' },
            { id: '12' },
            { id: '13' },
            { id: '14' },
        ],
        groups: ['A', 'B', 'C', 'D', 'E'],
    })

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
