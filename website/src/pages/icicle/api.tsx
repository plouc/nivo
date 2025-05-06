import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { generateLibTree } from '@nivo/generators'
import { Seo } from '../../components/Seo'
import { ApiClient } from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/icicle/props'
import mapper from '../../data/components/icicle/mapper'
import meta from '../../data/components/icicle/meta.yml'
import { svgDefaultProps } from '@nivo/icicle'

const data = generateLibTree()

const IcicleApi = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/icicle.png" }) {
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
                    gapX: 2,
                    gapY: 2,
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: '#fff',
                    colors: { scheme: 'nivo' },
                    colorBy: 'id',
                    inheritColorFromParent: true,
                    childColor: {
                        from: 'color',
                    },
                    enableLabels: true,
                    label: svgDefaultProps.label,
                    labelBoxAnchor: svgDefaultProps.labelBoxAnchor,
                    labelAlign: svgDefaultProps.labelAlign,
                    labelBaseline: svgDefaultProps.labelBaseline,
                    labelPaddingX: svgDefaultProps.labelPaddingX,
                    labelPaddingY: svgDefaultProps.labelPaddingY,
                    labelSkipWidth: 32,
                    labelSkipHeight: 32,
                    labelRotation: 0,
                    labelTextColor: {
                        from: 'color',
                        modifiers: [['darker', 1.4]],
                    },
                }}
            />
        </>
    )
}

export default IcicleApi
