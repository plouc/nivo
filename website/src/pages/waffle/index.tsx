import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { generateWaffleData } from '@nivo/generators'
import { ResponsiveWaffle, svgDefaultProps, ComputedDatum, Datum } from '@nivo/waffle'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/waffle/meta.yml'
import { groups } from '../../data/components/waffle/props'
import mapper from '../../data/components/waffle/mapper'

const initialProperties = {
    total: 100,

    rows: 18,
    columns: 14,
    fillDirection: svgDefaultProps.fillDirection,
    padding: 1,
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
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },

    animate: svgDefaultProps.animate,
    motionConfig: svgDefaultProps.motionConfig,
    motionStagger: 2,

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

const Waffle = () => {
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
        <ComponentTemplate
            name="Waffle"
            meta={meta.Waffle}
            icon="waffle"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            propertiesMapper={mapper}
            initialProperties={initialProperties}
            defaultProperties={svgDefaultProps}
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
                    <ResponsiveWaffle
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

export default Waffle
