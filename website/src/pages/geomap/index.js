import React from 'react'
import omit from 'lodash/omit'
import { ResponsiveGeoMap, GeoMapDefaultProps } from '@nivo/geo'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/geomap/meta.yml'
import mapper from '../../data/components/geo/mapper'
import { groups } from '../../data/components/geomap/props'
import countries from '../../data/components/geo/world_countries'
import { graphql, useStaticQuery } from 'gatsby'

const initialProperties = {
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    projectionType: 'mercator',
    projectionScale: 100,
    projectionTranslation: [0.5, 0.5],
    projectionRotation: [0, 0, 0],

    fillColor: '#eeeeee',
    borderWidth: 0.5,
    borderColor: '#333333',

    enableGraticule: true,
    graticuleLineWidth: 0.5,
    graticuleLineColor: '#666666',

    isInteractive: true,
}

const GeoMap = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/geomap.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="GeoMap"
            meta={meta.GeoMap}
            icon="geomap"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={GeoMapDefaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={properties => ({
                features: '/* please have a look at the description for usage */',
                ...properties,
            })}
            generateData={() => undefined}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveGeoMap
                        features={countries.features}
                        {...properties}
                        theme={theme}
                        onClick={feature => {
                            logAction({
                                type: 'click',
                                label: `${feature.properties.name} (${feature.id})`,
                                data: omit(feature, 'geometry'),
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default GeoMap
