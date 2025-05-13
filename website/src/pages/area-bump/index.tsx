import React, { Ref } from 'react'
import range from 'lodash/range.js'
import random from 'lodash/random.js'
import { useStaticQuery, graphql, PageProps } from 'gatsby'
import { patternDotsDef, patternLinesDef } from '@nivo/core'
import { ResponsiveAreaBump, areaBumpSvgDefaultProps as defaults, AreaBumpSerie } from '@nivo/bump'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/area-bump/meta.yml'
import { groups } from '../../data/components/area-bump/props'
import mapper, {
    UnmappedAreaBumpProps,
    MappedAreaBumpProps,
} from '../../data/components/area-bump/mapper'

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

const initialProperties: UnmappedAreaBumpProps = {
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
    startLabel: true,
    startLabelPadding: defaults.startLabelPadding,
    startLabelTextColor: defaults.startLabelTextColor,
    endLabel: true,
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
        truncateTickAt: 0,
    },
    axisBottom: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
        truncateTickAt: 0,
    },
    isInteractive: true,
    animate: defaults.animate,
    motionConfig: defaults.motionConfig,
}

const AreaBump = ({ location }: PageProps) => {
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
        <ComponentTemplate<
            UnmappedAreaBumpProps,
            MappedAreaBumpProps,
            AreaBumpSerie<{ x: number; y: number }, {}>[]
        >
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
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveAreaBump<{ x: number; y: number }>
                        data={data}
                        {...properties}
                        theme={theme}
                        ref={chartRef as Ref<SVGSVGElement>}
                        onClick={series =>
                            logAction({
                                type: 'click',
                                label: `[series] ${series.id}`,
                                color: series.color,
                                data: series,
                            })
                        }
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default AreaBump
