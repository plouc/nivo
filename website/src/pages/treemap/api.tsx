import React from 'react'
// @ts-ignore
import { TreeMapDefaultProps } from '@nivo/treemap'
import { Seo } from '../../components/Seo'
import { ApiClient } from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/treemap/props'
import mapper from '../../data/components/treemap/mapper'
import { generateLightDataSet } from '../../data/components/treemap/generator'
import meta from '../../data/components/treemap/meta.yml'
import { graphql, useStaticQuery } from 'gatsby'

const data = generateLightDataSet().root

const TreeMapApi = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/treemap.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <>
            <Seo
                title="TreeMap HTTP API"
                image={image}
                keywords={[...meta.TreeMap.tags, 'HTTP API']}
            />
            <ApiClient
                componentName="TreeMap"
                chartClass="treemap"
                apiPath="/charts/treemap"
                flavors={meta.flavors}
                dataProperty="data"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    data: JSON.stringify(data, null, '  '),
                    identity: 'name',
                    value: 'loc',
                    valueFormat: { format: '.02s', enabled: true },
                    tile: TreeMapDefaultProps.tile,
                    leavesOnly: TreeMapDefaultProps.leavesOnly,
                    innerPadding: TreeMapDefaultProps.innerPadding,
                    outerPadding: TreeMapDefaultProps.outerPadding,

                    width: 800,
                    height: 560,
                    margin: {
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                    },

                    enableLabel: TreeMapDefaultProps.enableLabel,
                    label: TreeMapDefaultProps.label,
                    labelSkipSize: 12,
                    labelTextColor: {
                        from: 'color',
                        modifiers: [['darker', 1.2]],
                    },
                    orientLabel: TreeMapDefaultProps.orientLabel,
                    enableParentLabel: TreeMapDefaultProps.enableParentLabel,
                    parentLabel: TreeMapDefaultProps.parentLabel,
                    parentLabelSize: TreeMapDefaultProps.parentLabelSize,
                    parentLabelPosition: TreeMapDefaultProps.parentLabelPosition,
                    parentLabelPadding: TreeMapDefaultProps.parentLabelPadding,
                    parentLabelTextColor: {
                        from: 'color',
                        modifiers: [['darker', 2]],
                    },

                    colors: TreeMapDefaultProps.colors,
                    colorBy: TreeMapDefaultProps.colorBy,
                    nodeOpacity: TreeMapDefaultProps.nodeOpacity,
                    borderWidth: TreeMapDefaultProps.borderWidth,
                    borderColor: {
                        from: 'color',
                        modifiers: [['darker', 0.1]],
                    },
                }}
            />
        </>
    )
}

export default TreeMapApi
