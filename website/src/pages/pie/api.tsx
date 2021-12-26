import React from 'react'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { Seo } from '../../components/Seo'
import { ApiClient } from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/pie/props'
import mapper from '../../data/components/pie/mapper'
import meta from '../../data/components/pie/meta.yml'
import { graphql, useStaticQuery } from 'gatsby'

const DATASET_SIZE = 12
const generateData = () =>
    generateProgrammingLanguageStats(true, DATASET_SIZE).map(d => ({
        id: d.label,
        ...d,
    }))

const data = generateData()

const PieApi = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/pie.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <>
            <Seo title="Pie HTTP API" image={image} keywords={[...meta.Pie.tags, 'HTTP API']} />
            <ApiClient
                componentName="Pie"
                chartClass="pie"
                apiPath="/charts/pie"
                flavors={meta.flavors}
                dataProperty="data"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 800,
                    height: 800,

                    margin: {
                        top: 40,
                        right: 80,
                        bottom: 80,
                        left: 80,
                    },

                    valueFormat: { format: '', enabled: false },

                    startAngle: 0,
                    endAngle: 360,
                    sortByValue: false,
                    innerRadius: 0.5,
                    padAngle: 0.7,
                    cornerRadius: 3,
                    fit: true,

                    colors: { scheme: 'nivo' },

                    borderWidth: 1,
                    borderColor: {
                        from: 'color',
                        modifiers: [['darker', 0.2]],
                    },

                    enableArcLinkLabels: true,
                    arcLinkLabel: 'id',
                    arcLinkLabelsSkipAngle: 10,
                    arcLinkLabelsTextOffset: 6,
                    arcLinkLabelsTextColor: '#333333',
                    arcLinkLabelsOffset: 0,
                    arcLinkLabelsDiagonalLength: 16,
                    arcLinkLabelsStraightLength: 24,
                    arcLinkLabelsThickness: 1,
                    arcLinkLabelsColor: { from: 'color' },

                    enableArcLabels: true,
                    arcLabel: 'value',
                    arcLabelsRadiusOffset: 0.5,
                    arcLabelsSkipAngle: 10,
                    arcLabelsTextColor: '#333333',

                    data: JSON.stringify(data, null, '  '),
                }}
            />
        </>
    )
}

export default PieApi
