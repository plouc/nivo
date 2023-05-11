import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import merge from 'lodash/merge'
import {
    ResponsiveParallelCoordinatesCanvas,
    commonDefaultProps,
    ParallelCoordinatesCanvasProps,
} from '@nivo/parallel-coordinates'
import { generateGroupedParallelCoordinatesData } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/parallel-coordinates/meta.yml'
import mapper from '../../data/components/parallel-coordinates/mapper'
import { groups } from '../../data/components/parallel-coordinates/props'

const variables = [
    { id: 'width', value: 'width', min: 0, max: 100, range: [0, 100] },
    { id: 'height', value: 'height', min: 0, max: 100, range: [0, 100] },
    { id: 'depth', value: 'depth', min: 0, max: 100, range: [0, 100] },
    { id: 'weight', value: 'weight', min: 0, max: 1000, range: [0, 1000] },
    { id: 'price', value: 'price', min: 0, max: 10, range: [0, 10], floating: true },
]

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
    variables: variables.map(({ range, floating, ...variable }) => variable),
    groupBy: 'group',
    margin: {
        top: 50,
        right: 140,
        bottom: 50,
        left: 60,
    },
    layout: commonDefaultProps.layout,
    curve: 'monotoneX',
    colors: { scheme: 'accent' },
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
    generateGroupedParallelCoordinatesData({
        ids: [
            { id: 'A' },
            { id: 'B' },
            { id: 'C' },
            { id: 'D' },
            { id: 'E' },
            { id: 'F' },
            { id: 'G' },
            { id: 'H' },
            { id: 'I' },
            { id: 'J' },
        ],
        groups: [
            { id: 'Group 00' },
            { id: 'Group 01' },
            { id: 'Group 02' },
            { id: 'Group 03' },
            { id: 'Group 04' },
            { id: 'Group 05' },
            { id: 'Group 06' },
        ],
        variables,
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
                            text: {
                                outlineWidth: 3,
                                outlineColor: theme.background,
                            },
                            axis: {
                                ticks: {
                                    line: {
                                        strokeWidth: 2,
                                        strokeLinecap: 'square',
                                    },
                                    text: {
                                        fill: theme.labels?.text.fill,
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
