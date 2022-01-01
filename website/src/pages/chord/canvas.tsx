import React from 'react'
import { generateChordData } from '@nivo/generators'
import { ResponsiveChordCanvas, canvasDefaultProps } from '@nivo/chord'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/chord/meta.yml'
import mapper from '../../data/components/chord/mapper'
import { groups } from '../../data/components/chord/props'
import { graphql, useStaticQuery } from 'gatsby'

const MATRIX_SIZE = 38

const initialProperties = {
    margin: {
        top: 60,
        right: 200,
        bottom: 60,
        left: 60,
    },

    valueFormat: '.2f',

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    padAngle: 0.006,
    innerRadiusRatio: 0.86,
    innerRadiusOffset: 0,

    arcOpacity: 1,
    activeArcOpacity: 1,
    inactiveArcOpacity: 0.4,
    arcBorderWidth: 0,
    arcBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.4]],
    },

    ribbonOpacity: 0.5,
    activeRibbonOpacity: 0.75,
    inactiveRibbonOpacity: 0,
    ribbonBorderWidth: 0,
    ribbonBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.4]],
    },

    enableLabel: true,
    label: 'id',
    labelOffset: 9,
    labelRotation: -90,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },

    colors: { scheme: 'red_blue' },

    isInteractive: true,

    legends: [
        {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemWidth: 80,
            itemHeight: 11,
            itemsSpacing: 0,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            symbolSize: 12,
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

const ChordCanvas = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/chord-canvas.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="ChordCanvas"
            meta={meta.ChordCanvas}
            icon="chord"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            defaultProperties={canvasDefaultProps}
            codePropertiesMapper={(properties, data) => ({
                keys: data.keys,
                ...properties,
            })}
            generateData={generateData}
            getDataSize={() => MATRIX_SIZE * MATRIX_SIZE + MATRIX_SIZE}
            getTabData={data => data.matrix}
            image={image}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveChordCanvas
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
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default ChordCanvas
