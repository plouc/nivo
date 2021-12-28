import React from 'react'
import range from 'lodash/range'
import random from 'lodash/random'
import { useStaticQuery, graphql } from 'gatsby'
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { ResponsiveAreaBump, areaBumpSvgDefaultProps as defaults } from '@nivo/bump'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/area-bump/meta.yml'
import { groups } from '../../data/components/area-bump/props'
import mapper from '../../data/components/area-bump/mapper'

const serieIds = ['JavaScript', 'ReasonML', 'TypeScript', 'Elm', 'CoffeeScript']
const generateData = () => {
    const years = range(2000, 2006)

    return serieIds.map(id => ({
        id,
        data: years.map(year => ({
            x: year,
            y: random(10, 30),
        })),
    }))
}

const initialProperties = {
    margin: {
        top: 40,
        right: 100,
        bottom: 40,
        left: 100,
    },

    align: defaults.align,
    interpolation: defaults.interpolation,
    spacing: 8,
    xPadding: defaults.xPadding,

    colors: { scheme: 'nivo' },
    blendMode: 'multiply',
    fillOpacity: defaults.fillOpacity,
    activeFillOpacity: defaults.activeFillOpacity,
    inactiveFillOpacity: defaults.inactiveFillOpacity,
    defs: [
        patternDotsDef('dots', {
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
        }),
        patternLinesDef('lines', {
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
        }),
    ],
    fill: [
        { match: { id: 'CoffeeScript' }, id: 'dots' },
        { match: { id: 'TypeScript' }, id: 'lines' },
    ],
    borderWidth: defaults.borderWidth,
    activeBorderWidth: defaults.activeBorderWidth,
    inactiveBorderWidth: defaults.inactiveBorderWidth,
    borderColor: defaults.borderColor,
    borderOpacity: defaults.borderOpacity,
    activeBorderOpacity: defaults.activeBorderOpacity,
    inactiveBorderOpacity: defaults.inactiveBorderOpacity,

    startLabel: 'id',
    startLabelPadding: defaults.startLabelPadding,
    startLabelTextColor: defaults.startLabelTextColor,
    endLabel: 'id',
    endLabelPadding: defaults.endLabelPadding,
    endLabelTextColor: defaults.endLabelTextColor,

    enableGridX: defaults.enableGridX,
    axisTop: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -36,
    },
    axisBottom: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
    },

    isInteractive: true,

    animate: defaults.animate,
    motionConfig: defaults.motionConfig,
}

const AreaBump = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/area-bump.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="AreaBump"
            meta={meta.AreaBump}
            icon="area-bump"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            defaultProperties={defaults}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            generateData={generateData}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveAreaBump<{ x: number; y: number }>
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={serie =>
                            logAction({
                                type: 'click',
                                label: `[serie] ${serie.id}`,
                                color: serie.color,
                                data: serie,
                            })
                        }
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default AreaBump
