import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import merge from 'lodash/merge'
import { ResponsiveParallelCoordinates, commonDefaultProps } from '@nivo/parallel-coordinates'
import { generateParallelCoordinatesData } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/parallel-coordinates/meta.yml'
import mapper from '../../data/components/parallel-coordinates/mapper'
import { groups } from '../../data/components/parallel-coordinates/props'

const variables = [
    {
        id: 'temp',
        label: 'temperature',
        value: 'temp',
        range: [-10, 40],
        floating: true,
        min: 'auto',
        max: 'auto',
        ticksPosition: 'before',
        legendPosition: 'start',
        legendOffset: 20,
    },
    {
        id: 'cost',
        value: 'cost',
        range: [200, 40000],
        min: 0,
        max: 'auto',
        ticksPosition: 'before',
        legendPosition: 'start',
        legendOffset: 20,
    },
    {
        id: 'weight',
        value: 'weight',
        range: [10, 300],
        min: 'auto',
        max: 'auto',
        legendPosition: 'start',
        legendOffset: -20,
    },
    {
        id: 'volume',
        value: 'volume',
        floating: true,
        range: [0.2, 7.6],
        min: 0,
        max: 'auto',
        legendPosition: 'start',
        legendOffset: -20,
    },
]

const initialProperties = {
    variables: variables.map(({ range, floating, ...variable }) => variable),
    margin: {
        top: 50,
        right: 120,
        bottom: 50,
        left: 60,
    },
    layout: commonDefaultProps.layout,
    curve: commonDefaultProps.curve,
    colors: commonDefaultProps.colors,
    lineWidth: 3,
    lineOpacity: commonDefaultProps.lineOpacity,
    axesTicksPosition: commonDefaultProps.axesTicksPosition,
    animate: commonDefaultProps.animate,
    motionConfig: commonDefaultProps.motionConfig,
    legends: [
        {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 60,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            onClick: (data: any) => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1,
                    },
                },
            ],
        },
    ],
}

const generateData = () =>
    generateParallelCoordinatesData({
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
        variables,
    })

const ParallelCoordinates = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/parallel-coordinates.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="ParallelCoordinates"
            meta={meta.ParallelCoordinates}
            icon="parallel-coordinates"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={commonDefaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
            image={image}
        >
            {(properties, data, theme) => {
                return (
                    <ResponsiveParallelCoordinates
                        data={data}
                        {...properties}
                        theme={merge({}, theme, {
                            text: {
                                outlineWidth: 2,
                                outlineColor: theme.background,
                            },
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

export default ParallelCoordinates
