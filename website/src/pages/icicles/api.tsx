import React from 'react'
import { generateLibTree } from '@nivo/generators'
import { Seo } from '../../components/Seo'
import { ApiClient } from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/icicles/props'
import mapper from '../../data/components/icicles/mapper'
import meta from '../../data/components/icicles/meta.yml'
import { graphql, useStaticQuery } from 'gatsby'

const data = generateLibTree()

const IciclesApi = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/icicles.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <>
            <Seo
                title="Icicles HTTP API"
                image={image}
                keywords={[...meta.Icicles.tags, 'HTTP API']}
            />
            <ApiClient
                componentName="Icicles"
                chartClass="icicles"
                apiPath="/charts/icicles"
                flavors={meta.flavors}
                dataProperty="data"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 600,
                    height: 600,
                    direction: "bottom",
                    data: JSON.stringify(data, null, '  '),
                    margin: {
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                    },
                    id: 'name',
                    value: 'loc',
                    valueFormat: { format: '', enabled: false },
                    cornerRadius: 2,
                    borderWidth: 1,
                    borderColor: 'white',
                    colors: { scheme: 'nivo' },
                    colorBy: 'id',
                    inheritColorFromParent: true,
                    childColor: {
                        from: 'color',
                    },
                    enableRectLabels: true,
                    rectLabel: 'formattedValue',
                    rectLabelsTextColor: {
                        from: 'color',
                        modifiers: [['darker', 1.4]],
                    },
                }}
            />
        </>
    )
}

export default IciclesApi
