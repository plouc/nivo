import React from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import omit from 'lodash/omit.js'
import { ResponsiveLine, svgDefaultProps, isPoint } from '@nivo/line'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/line/meta.yml'
import {
    svgMapper,
    UnmappedLineSvgProps,
    MappedLineSvgProps,
} from '../../data/components/line/mapper'
import { groups } from '../../data/components/line/props'
import defaultSettings from '../../data/components/line/defaults'
import { generateLightDataSet, LineSampleSeries } from '../../data/components/line/generator'

const initialProperties: UnmappedLineSvgProps = {
    ...omit(defaultSettings, ['width', 'height']),
    pointLabel: 'yFormatted',
    useMesh: true,
    debugMesh: false,
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
        },
    ],
    animate: svgDefaultProps.animate,
    motionConfig: svgDefaultProps.motionConfig,
    isFocusable: svgDefaultProps.isFocusable,
}

const linearData: LineSampleSeries[] = [
    {
        id: 'fake corp. A',
        data: [
            { x: 0, y: 7 },
            { x: 1, y: 5 },
            { x: 2, y: 11 },
            { x: 3, y: 9 },
            { x: 4, y: 13 },
            { x: 7, y: 16 },
            { x: 9, y: 12 },
        ],
    },
]

const Line = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/line.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate<UnmappedLineSvgProps, MappedLineSvgProps, LineSampleSeries[]>
            name="Line"
            meta={meta.Line}
            icon="line"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={svgDefaultProps}
            propertiesMapper={svgMapper}
            generateData={generateLightDataSet}
            image={image}
            location={location}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveLine
                        data={properties.xScale!.type === 'linear' ? linearData : data}
                        {...properties}
                        theme={theme}
                        onClick={datum => {
                            if (isPoint(datum)) {
                                logAction({
                                    type: 'click',
                                    label: `[point] series: ${datum.seriesId}, x: ${datum.data.x}, y: ${datum.data.y}`,
                                    color: datum.color,
                                    data: datum,
                                })
                            } else {
                                logAction({
                                    type: 'click',
                                    label: `[slice] id: ${datum.id}`,
                                    data: datum,
                                })
                            }
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Line
