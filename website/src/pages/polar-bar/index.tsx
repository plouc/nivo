import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ResponsivePolarBar, PolarBarSvgProps, svgDefaultProps } from '@nivo/polar-bar'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/polar-bar/meta.yml'
import mapper from '../../data/components/polar-bar/mapper'
import { groups } from '../../data/components/polar-bar/props'
import { generateLightDataSet } from '../../data/components/polar-bar/generator'

type MappedPolarBarProps = Omit<PolarBarSvgProps<any>, 'data' | 'width' | 'height'>
type UnmappedPolarBarProps = Omit<
    MappedPolarBarProps,
    'valueFormat' | 'radialAxisStart' | 'radialAxisEnd' | 'circularAxisInner' | 'circularAxisOuter'
> & {
    valueFormat: {
        format: string
        enabled: boolean
    }
    radialAxisStart: { enable: boolean } & MappedPolarBarProps['radialAxisStart']
    radialAxisEnd: { enable: boolean } & MappedPolarBarProps['radialAxisEnd']
    circularAxisInner: { enable: boolean } & MappedPolarBarProps['circularAxisInner']
    circularAxisOuter: { enable: boolean } & MappedPolarBarProps['circularAxisOuter']
}

const initialProperties: UnmappedPolarBarProps = {
    indexBy: 'month',
    valueSteps: [0, 500, 1000],
    adjustValueRange: true,
    valueFormat: { format: '>-$.0f', enabled: true },

    margin: {
        top: 30,
        right: 20,
        bottom: 70,
        left: 20,
    },

    startAngle: svgDefaultProps.startAngle,
    endAngle: svgDefaultProps.endAngle,
    innerRadius: 0.25,
    cornerRadius: 2,

    colors: svgDefaultProps.colors,
    borderWidth: 1,
    borderColor: svgDefaultProps.borderColor,

    enableArcLabels: true,
    arcLabel: svgDefaultProps.arcLabel,
    arcLabelsRadiusOffset: 0.5,
    arcLabelsSkipAngle: 0,
    arcLabelsSkipRadius: 28,
    arcLabelsTextColor: svgDefaultProps.arcLabelsTextColor,

    enableRadialGrid: true,
    enableCircularGrid: true,
    radialAxisStart: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
    },
    radialAxisEnd: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
    },
    circularAxisInner: {
        enable: false,
        tickSize: 0,
        tickPadding: 15,
        tickRotation: 0,
    },
    circularAxisOuter: {
        enable: true,
        tickSize: 0,
        tickPadding: 15,
        tickRotation: 0,
    },

    animate: true,
    motionConfig: 'gentle',
    transitionMode: 'startAngle',

    isInteractive: true,

    legends: [
        {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 50,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 90,
            itemHeight: 16,
            itemTextColor: '#999',
            symbolSize: 16,
            symbolShape: 'circle',
        },
    ],
}

const PolarBar = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/polar-bar.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate<UnmappedPolarBarProps, MappedPolarBarProps, any>
            name="PolarBar"
            meta={meta.PolarBar}
            icon="polar-bar"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={svgDefaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties: any, data: any) => ({
                keys: data.keys,
                ...properties,
            })}
            generateData={generateLightDataSet}
            getTabData={data => data.data}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsivePolarBar
                        data={data.data}
                        keys={data.keys}
                        {...properties}
                        theme={theme}
                        onClick={arc =>
                            logAction({
                                type: 'click',
                                label: `[arc] ${arc.id}`,
                                color: arc.color,
                                data: arc,
                            })
                        }
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default PolarBar
