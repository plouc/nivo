import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { generateWaffleData } from '@bitbloom/nivo-generators'
import { ResponsiveWaffleHtml, htmlDefaultProps, ComputedDatum, Datum } from '@bitbloom/nivo-waffle'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/waffle/meta.yml'
import { groups } from '../../data/components/waffle/props'
import mapper from '../../data/components/waffle/mapper'

const initialProperties = {
    total: 100,

    rows: 18,
    columns: 14,
    fillDirection: htmlDefaultProps.fillDirection,
    padding: 1,
    valueFormat: { format: '.2f', enabled: true },

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    emptyColor: '#cccccc',
    emptyOpacity: 1,
    colors: { scheme: 'set2' },
    borderRadius: 3,
    borderWidth: 0,
    borderColor: {
        from: 'color',
        gamma: [['darker', 0.3]],
    },

    animate: htmlDefaultProps.animate,
    motionConfig: htmlDefaultProps.motionConfig,
    motionStagger: 2,

    isInteractive: true,
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

const WaffleHtml = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/waffle-html.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="WaffleHtml"
            meta={meta.WaffleHtml}
            icon="waffle"
            flavors={meta.flavors}
            currentFlavor="html"
            properties={groups}
            propertiesMapper={mapper}
            initialProperties={initialProperties}
            defaultProperties={htmlDefaultProps}
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
                    <ResponsiveWaffleHtml
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

export default WaffleHtml
