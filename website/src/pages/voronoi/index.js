import React from 'react'
import range from 'lodash/range'
import { ResponsiveVoronoi, defaultVoronoiProps } from '@bitbloom/nivo-voronoi'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/voronoi/meta.yml'
import { groups } from '../../data/components/voronoi/props'
import { graphql, useStaticQuery } from 'gatsby'

const xDomain = [0, 100]
const yDomain = [0, 100]

const generateData = () =>
    range(100).map(id => ({ id, x: Math.random() * xDomain[1], y: Math.random() * yDomain[1] }))

const initialProperties = {
    ...defaultVoronoiProps,

    xDomain,
    yDomain,

    margin: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
    },

    enableLinks: true,
    linkLineWidth: 1,
    linkLineColor: '#cccccc',

    enableCells: true,
    cellLineWidth: 2,
    cellLineColor: '#c6432d',

    enablePoints: true,
    pointSize: 6,
    pointColor: '#c6432d',
}

const Voronoi = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/voronoi.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="Voronoi"
            meta={meta.Voronoi}
            icon="voronoi"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaultVoronoiProps}
            generateData={generateData}
            image={image}
        >
            {(properties, data, theme) => {
                return (
                    <ResponsiveVoronoi
                        data={data}
                        xDomain={xDomain}
                        yDomain={yDomain}
                        {...properties}
                        theme={theme}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Voronoi
