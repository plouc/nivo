import React from 'react'
import { generateChordData } from '@bitbloom/nivo-generators'
import { Seo } from '../../components/Seo'
import { ApiClient } from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/chord/props'
import mapper from '../../data/components/chord/mapper'
import meta from '../../data/components/chord/meta.yml'
import { graphql, useStaticQuery } from 'gatsby'

const MATRIX_SIZE = 5

const data = generateChordData({ size: MATRIX_SIZE })

const ChordApi = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/chord.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <>
            <Seo title="Chord HTTP API" image={image} keywords={[...meta.Chord.tags, 'HTTP API']} />
            <ApiClient
                componentName="Chord"
                chartClass="chord"
                apiPath="/charts/chord"
                flavors={meta.flavors}
                //dataProperty="matrix"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 800,
                    height: 800,
                    data: JSON.stringify(data.matrix, null, '  '),
                    keys: data.keys,
                    margin: {
                        top: 40,
                        right: 40,
                        bottom: 40,
                        left: 40,
                    },
                    padAngle: 0.02,
                    innerRadiusRatio: 0.96,
                    innerRadiusOffset: 0.01,

                    colors: { scheme: 'nivo' },

                    arcOpacity: 1,
                    arcBorderWidth: 1,
                    arcBorderColor: {
                        from: 'color',
                        modifiers: [['darker', 0.4]],
                    },

                    ribbonOpacity: 0.5,
                    ribbonBorderWidth: 1,
                    ribbonBorderColor: {
                        from: 'color',
                        modifiers: [['darker', 0.4]],
                    },

                    enableLabel: true,
                    label: 'id',
                    labelOffset: 12,
                    labelRotation: -90,
                    labelTextColor: {
                        from: 'color',
                        modifiers: [['darker', 1]],
                    },
                }}
            />
        </>
    )
}

export default ChordApi
