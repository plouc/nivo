import React from 'react'
import { generateChordData } from '@nivo/generators'
import { ResponsiveChord, svgDefaultProps } from '@nivo/chord'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/chord/meta.yml'
import mapper from '../../data/components/chord/mapper'
import { groups } from '../../data/components/chord/props'
import { graphql, useStaticQuery } from 'gatsby'

const MATRIX_SIZE = 5

const initialProperties = {
    margin: {
        top: 60,
        right: 60,
        bottom: 90,
        left: 60,
    },

    valueFormat: '.2f',

    padAngle: 0.02,
    innerRadiusRatio: 0.96,
    innerRadiusOffset: 0.02,

    arcOpacity: 1,
    activeArcOpacity: 1,
    inactiveArcOpacity: 0.25,
    arcBorderWidth: 1,
    arcBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.6]],
    },

    ribbonBlendMode: 'normal',
    ribbonOpacity: 0.5,
    activeRibbonOpacity: 0.75,
    inactiveRibbonOpacity: 0.25,
    ribbonBorderWidth: 1,
    ribbonBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.6]],
    },

    enableLabel: true,
    label: 'id',
    labelOffset: 12,
    labelRotation: -90,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },

    colors: { scheme: 'nivo' },

    isInteractive: true,

    animate: true,
    motionConfig: 'stiff',

    legends: [
        {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 70,
            itemWidth: 80,
            itemHeight: 14,
            itemsSpacing: 0,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            symbolSize: 12,
            symbolShape: 'circle',
            onClick: d => {
                alert(JSON.stringify(d, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                    },
                },
            ],
        },
    ],
}

const generateData = () => generateChordData({ size: MATRIX_SIZE })

const Chord = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/chord.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="Chord"
            meta={meta.Chord}
            icon="chord"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={svgDefaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
            })}
            generateData={generateData}
            getTabData={data => data.matrix}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveChord
                        data={data.matrix}
                        keys={data.keys}
                        {...properties}
                        theme={theme}
                        onArcClick={arc => {
                            logAction({
                                type: 'click',
                                label: `[arc] ${arc.label}`,
                                color: arc.color,
                                data: arc,
                            })
                        }}
                        onRibbonClick={ribbon => {
                            logAction({
                                type: 'click',
                                label: `[ribbon] ${ribbon.source.label} (${ribbon.source.formattedValue}) → ${ribbon.target.label} (${ribbon.target.formattedValue})`,
                                color: ribbon.source.color,
                                data: ribbon,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Chord
