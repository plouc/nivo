import React from 'react'
import { ResponsiveStream, svgDefaultProps } from '@nivo/stream'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/stream/meta.yml'
import mapper from '../../data/components/stream/mapper'
import { groups } from '../../data/components/stream/props'
import { generateLightDataSet } from '../../data/components/stream/generator'
import defaultSettings from '../../data/components/stream/defaults'
import { graphql, useStaticQuery } from 'gatsby'

const initialProperties = {
    ...defaultSettings,
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999999',
            symbolSize: 12,
            symbolShape: 'circle',
            onClick: d => {
                alert(JSON.stringify(d, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000000',
                    },
                },
            ],
        },
    ],
}

const Stream = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/stream.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="Stream"
            meta={meta.Stream}
            icon="stream"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={svgDefaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
            })}
            generateData={generateLightDataSet}
            getTabData={data => data.data}
            image={image}
        >
            {(properties, data, theme) => {
                return (
                    <ResponsiveStream
                        data={data.data}
                        keys={data.keys}
                        {...properties}
                        theme={theme}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Stream
