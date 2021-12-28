import React from 'react'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'
import { graphql, useStaticQuery } from 'gatsby'
import { ResponsiveBump, bumpSvgDefaultProps as defaults, BumpCommonProps } from '@nivo/bump'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/bump/meta.yml'
import { groups } from '../../data/components/bump/props'
import mapper from '../../data/components/bump/mapper'

const generateData = () => {
    const years = range(2000, 2005)
    const ranks = range(1, 13)

    const series: {
        id: string
        data: {
            x: number
            y: number
        }[]
    }[] = ranks.map(rank => {
        return {
            id: `Serie ${rank}`,
            data: [],
        }
    })

    years.forEach(year => {
        shuffle(ranks).forEach((rank, i) => {
            series[i].data.push({
                x: year,
                y: rank,
            })
        })
    })

    return series
}

type UnmappedProps = Omit<BumpCommonProps<{ x: number; y: number }>, 'whatever'>

type Props = UnmappedProps

const initialProperties: UnmappedProps = {
    margin: {
        top: 40,
        right: 100,
        bottom: 40,
        left: 60,
    },

    interpolation: defaults.interpolation,
    xPadding: defaults.xPadding,
    xOuterPadding: defaults.xOuterPadding,
    yOuterPadding: defaults.yOuterPadding,

    colors: { scheme: 'spectral' },
    lineWidth: 3,
    activeLineWidth: 6,
    inactiveLineWidth: 3,
    opacity: defaults.opacity,
    activeOpacity: defaults.activeOpacity,
    inactiveOpacity: 0.15,

    startLabel: false,
    startLabelPadding: defaults.startLabelPadding,
    startLabelTextColor: defaults.startLabelTextColor,
    endLabel: 'id',
    endLabelPadding: defaults.endLabelPadding,
    endLabelTextColor: defaults.endLabelTextColor,

    pointSize: 10,
    activePointSize: 16,
    inactivePointSize: 0,
    pointColor: { theme: 'background' },
    pointBorderWidth: 3,
    activePointBorderWidth: 3,
    inactivePointBorderWidth: 0,
    pointBorderColor: { from: 'serie.color' },

    enableGridX: true,
    enableGridY: true,
    axisTop: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -36,
    },
    axisRight: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: (value: number) => `#${value}`,
        legend: 'ranking',
        legendPosition: 'middle',
        legendOffset: 40,
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
    axisLeft: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: (value: number) => `#${value}`,
        legend: 'ranking',
        legendPosition: 'middle',
        legendOffset: -40,
    },

    isInteractive: true,

    animate: defaults.animate,
    motionConfig: defaults.motionConfig,
}

const Bump = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/bump.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate<UnmappedProps, Props>
            name="Bump"
            meta={meta.Bump}
            icon="chord"
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
                    <ResponsiveBump<{ x: number; y: number }>
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

export default Bump
