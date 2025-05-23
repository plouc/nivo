import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import omit from 'lodash/omit'
import { ResponsiveBullet, svgDefaultProps } from '@nivo/bullet'
import { generateBulletData } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/bullet/meta.yml'
import { bulletSvgMapper } from '../../data/components/bullet/mapper'
import { groups } from '../../data/components/bullet/props'

const rangeIds = ['bad', 'good', 'very good']

let seed = 128

const generateData = () => {
    seed++

    return generateBulletData({
        seed,
        rangeIds,
        precision: 1,
        rangeJitter: 0.8,
        bullets: [
            {
                id: 'Q1',
            },
            {
                id: 'Q2',
                min: -100,
                max: 40,
                baseline: -20,
                precision: 5,
                rangeIds: ['very bad', ...rangeIds],
            },
            {
                id: 'Q3',
                max: 60,
                precision: 2,
            },
            {
                id: 'Q4',
                max: 200,
                precision: 10,
            },
        ],
    })
}

const initialProperties = {
    ...omit(svgDefaultProps, 'tooltip'),
    margin: {
        top: 40,
        right: 50,
        bottom: 40,
        left: 50,
    },
    spacing: 70,
    rangeBorderWidth: 0.5,
    valueFormat: { format: '>-$.2f', enabled: false },
    axisBefore: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
        truncateTickAt: 0,
    },
    axisAfter: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
        truncateTickAt: 0,
    },
}

const Bullet = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/bullet.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="Bullet"
            meta={meta.Bullet}
            icon="bullet"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={svgDefaultProps}
            propertiesMapper={bulletSvgMapper}
            generateData={generateData}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveBullet
                        {...properties}
                        data={data}
                        theme={theme}
                        debounceResize={200}
                        ref={chartRef as Ref<SVGSVGElement>}
                        onRangeClick={range => {
                            logAction({
                                type: 'click',
                                label: `[range] ${range.id}: [${range.v0}, ${range.v1}]`,
                                color: range.color,
                                data: range,
                            })
                        }}
                        onMeasureClick={measure => {
                            logAction({
                                type: 'click',
                                label: `[measure] ${measure.id}: [${measure.v0}, ${measure.v1}]`,
                                color: measure.color,
                                data: measure,
                            })
                        }}
                        onMarkerClick={marker => {
                            logAction({
                                type: 'click',
                                label: `[marker] ${marker.id}: ${marker.value}`,
                                color: marker.color,
                                data: marker,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Bullet
