import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { generateLibTree } from '@nivo/generators'
import { Seo } from '../../components/Seo'
import { ApiClient } from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/icicle/props'
import mapper from '../../data/components/icicle/mapper'
import meta from '../../data/components/icicle/meta.yml'

const data = generateLibTree()

const IcicleApi = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
        // TODO: change with icicle capture
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/sunburst.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <>
            <Seo
                title="Icicle HTTP API"
                image={image}
                keywords={[...meta.Icicle.tags, 'HTTP API']}
            />
            <ApiClient
                componentName="Icicle"
                chartClass="icicle"
                apiPath="/charts/icicle"
                flavors={meta.flavors}
                dataProperty="data"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 600,
                    height: 600,
                    orientation: 'bottom',
                    data: JSON.stringify(data, null, '  '),
                    margin: {
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                    },
                    identity: 'name',
                    value: 'loc',
                    valueFormat: { format: '', enabled: false },
                    padding: 0,
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: '#fff',
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
                    rectLabelsSkipLength: 0,
                    rectLabelsSkipPercentage: 0,
                    rectLabelsOffset: 1,
                }}
            />
        </>
    )
}

export default IcicleApi
