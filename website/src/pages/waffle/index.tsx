import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { generateWaffleData } from '@nivo/generators'
import { ResponsiveWaffle, svgDefaultProps, ComputedDatum, Datum } from '@nivo/waffle'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/waffle/meta.yml'
import { groups } from '../../data/components/waffle/props'
import {
    svgMapper,
    UnmappedWaffleSvgProps,
    MappedWaffleSvgProps,
} from '../../data/components/waffle/mapper'

const initialProperties: UnmappedWaffleSvgProps = {
    total: 100,
    rows: 18,
    columns: 14,
    fillDirection: svgDefaultProps.fillDirection,
    padding: svgDefaultProps.padding,
    valueFormat: { format: '.2f', enabled: true },
    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 120,
    },
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    colors: { scheme: 'nivo' },
    borderRadius: 3,
    borderWidth: svgDefaultProps.borderWidth,
    borderColor: svgDefaultProps.borderColor,
    animate: svgDefaultProps.animate,
    motionConfig: svgDefaultProps.motionConfig,
    motionStagger: 2,
    isInteractive: svgDefaultProps.isInteractive,
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
            symbolSize: 20,
        },
    ],
}

const generateData = () =>
    generateWaffleData({
        total: initialProperties.total,
        groups: [
            {
                id: 'cats',
                label: 'Cats',
            },
            {
                id: 'dogs',
                label: 'Dogs',
            },
            {
                id: 'rabbits',
                label: 'Rabits',
            },
        ],
    })

const Waffle = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/waffle.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate<UnmappedWaffleSvgProps, MappedWaffleSvgProps, any>
            name="Waffle"
            meta={meta.Waffle}
            icon="waffle"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            propertiesMapper={svgMapper}
            initialProperties={initialProperties}
            defaultProperties={svgDefaultProps}
            generateData={generateData}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveWaffle
                        {...properties}
                        data={data}
                        theme={theme}
                        ref={chartRef as Ref<SVGSVGElement>}
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

export default Waffle
