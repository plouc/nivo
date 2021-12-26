import React from 'react'
import { generateLibTree } from '@nivo/generators'
import { Seo } from '../../components/Seo'
import ApiClient from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/circle-packing/props'
import mapper from '../../data/components/circle-packing/mapper'
import meta from '../../data/components/circle-packing/meta.yml'
import { graphql, useStaticQuery } from 'gatsby'

const root = generateLibTree()

const CirclePackingApi = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/circle-packing.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 900, quality: 100)
                }
            }
        }
    `)

    return (
        <>
            <Seo
                title="CirclePacking HTTP API"
                image={image}
                keywords={[...meta.CirclePacking.tags, 'HTTP API']}
            />
            <ApiClient
                componentName="CirclePacking"
                chartClass="circle-packing"
                apiPath="/charts/circle_packing"
                flavors={meta.flavors}
                dataProperty="root"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 600,
                    height: 600,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    },
                    data: JSON.stringify(root, null, '  '),
                    id: 'name',
                    value: 'loc',
                    valueFormat: { format: '', enabled: false },
                    colors: { scheme: 'nivo' },
                    colorBy: 'depth',
                    inheritColorFromParent: false,
                    childColor: {
                        from: 'color',
                        modifiers: [['darker', 0.3]],
                    },
                    padding: 1,
                    enableLabels: true,
                    leavesOnly: false,
                    label: 'id',
                    labelsSkipRadius: 8,
                    labelTextColor: {
                        from: 'color',
                        modifiers: [['darker', 0.8]],
                    },
                    borderWidth: 0,
                    borderColor: {
                        from: 'color',
                        modifiers: [['darker', 0.3]],
                    },
                }}
            />
        </>
    )
}

export default CirclePackingApi
