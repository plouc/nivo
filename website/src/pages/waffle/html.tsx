import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ResponsiveWaffleHtml, htmlDefaultProps, ComputedDatum, Datum } from '@nivo/waffle'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/waffle/meta.yml'
import { groups } from '../../data/components/waffle/props'
import mapper from '../../data/components/waffle/mapper'

const generateData = () => [
    {
        id: 'cats',
        label: 'Cats',
        value: Math.random() * 33,
    },
    {
        id: 'dogs',
        label: 'Dogs',
        value: Math.random() * 33,
    },
    {
        id: 'rabbits',
        label: 'Rabits',
        value: Math.random() * 33,
    },
]

const initialProperties = {
    total: 100,

    rows: 18,
    columns: 14,
    fillDirection: 'bottom',
    padding: 1,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    cellComponent: 'default',
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    colors: { scheme: 'set2' },
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
