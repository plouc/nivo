import React from 'react'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'
import { graphql, useStaticQuery } from 'gatsby'
import { ResponsiveBump, bumpSvgDefaultProps as defaults, BumpCommonProps } from '@bitbloom/nivo-bump'
import { MotionProps } from '@bitbloom/nivo-core'
import { AxisProps } from '@bitbloom/nivo-axes'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/bump/meta.yml'
import { groups } from '../../data/components/bump/props'
import mapper from '../../data/components/bump/mapper'

interface Datum {
    x: number
    y: number
}

const generateData = () => {
    const years = range(2000, 2005)
    const ranks = range(1, 13)

    const series: {
        id: string
        data: Datum[]
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

type Props = Omit<
    BumpCommonProps<Datum, {}>,
    'theme' | 'onMouseEnter' | 'onMouseMove' | 'onMouseLeave' | 'onClick' | 'renderWrapper'
> &
    MotionProps

type UnmappedProps = Omit<Props, 'axisTop' | 'axisRight' | 'axisBottom' | 'axisLeft'> & {
    axisTop: AxisProps & { enable: boolean }
    axisRight: AxisProps & { enable: boolean }
    axisBottom: AxisProps & { enable: boolean }
    axisLeft: AxisProps & { enable: boolean }
}

const initialProperties: UnmappedProps = {
    ...defaults,
    margin: {
        top: 40,
        right: 100,
        bottom: 40,
        left: 60,
    },

    colors: { scheme: 'spectral' },
    lineWidth: 3,
    activeLineWidth: 6,
    inactiveLineWidth: 3,
    inactiveOpacity: 0.15,

    pointSize: 10,
    activePointSize: 16,
    inactivePointSize: 0,
    pointColor: { theme: 'background' },
    pointBorderWidth: 3,
    activePointBorderWidth: 3,
    inactivePointBorderWidth: 0,
    pointBorderColor: { from: 'serie.color' },

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
                    <ResponsiveBump<Datum>
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
