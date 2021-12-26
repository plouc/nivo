import React from 'react'
import { generateLibTree } from '@nivo/generators'
import { Seo } from '../../components/Seo'
import { ApiClient } from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/sunburst/props'
import mapper from '../../data/components/sunburst/mapper'
import meta from '../../data/components/sunburst/meta.yml'
import { graphql, useStaticQuery } from 'gatsby'

const data = generateLibTree()

const SunburstApi = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
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
                title="Sunburst HTTP API"
                image={image}
                keywords={[...meta.Sunburst.tags, 'HTTP API']}
            />
            <ApiClient
                componentName="Sunburst"
                chartClass="sunburst"
                apiPath="/charts/sunburst"
                flavors={meta.flavors}
                dataProperty="data"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 600,
                    height: 600,
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
                    enableArcLabels: true,
                    arcLabel: 'formattedValue',
                    arcLabelsRadiusOffset: 0.5,
                    arcLabelsSkipAngle: 10,
                    arcLabelsTextColor: {
                        from: 'color',
                        modifiers: [['darker', 1.4]],
                    },
                }}
            />
        </>
    )
}

export default SunburstApi
