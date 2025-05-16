import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { generateChordData } from '@nivo/generators'
import { ResponsiveChord, svgDefaultProps } from '@nivo/chord'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/chord/meta.yml'
import mapper, { UnmappedChordProps, MappedChordProps } from '../../data/components/chord/mapper'
import { groups } from '../../data/components/chord/props'

const MATRIX_SIZE = 5

const initialProperties: UnmappedChordProps = {
    margin: {
        top: 60,
        right: 60,
        bottom: 90,
        left: 60,
    },
    // valueFormat: '.2f',
    padAngle: 0.06,
    innerRadiusRatio: svgDefaultProps.innerRadiusRatio,
    innerRadiusOffset: svgDefaultProps.innerRadiusOffset,
    arcOpacity: svgDefaultProps.arcOpacity,
    activeArcOpacity: svgDefaultProps.activeArcOpacity,
    inactiveArcOpacity: svgDefaultProps.inactiveArcOpacity,
    arcBorderWidth: svgDefaultProps.arcBorderWidth,
    arcBorderColor: svgDefaultProps.arcBorderColor,
    ribbonBlendMode: svgDefaultProps.ribbonBlendMode,
    ribbonOpacity: svgDefaultProps.ribbonOpacity,
    activeRibbonOpacity: svgDefaultProps.activeRibbonOpacity,
    inactiveRibbonOpacity: svgDefaultProps.inactiveRibbonOpacity,
    ribbonBorderWidth: 1,
    ribbonBorderColor: svgDefaultProps.ribbonBorderColor,
    enableLabel: true,
    label: 'id',
    labelOffset: 12,
    labelRotation: svgDefaultProps.labelRotation,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },
    colors: { scheme: 'nivo' },
    isInteractive: svgDefaultProps.isInteractive,
    animate: svgDefaultProps.animate,
    motionConfig: svgDefaultProps.motionConfig,
    legends: [
        {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 70,
            itemWidth: 80,
            itemHeight: 16,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            symbolSize: 16,
            symbolShape: 'circle',
        },
    ],
}

const generateData = () => generateChordData({ size: MATRIX_SIZE })

const Chord = ({ location }: PageProps) => {
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
        <ComponentTemplate<UnmappedChordProps, MappedChordProps, any>
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
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveChord
                        {...properties}
                        data={data.matrix}
                        keys={data.keys}
                        theme={theme}
                        ref={chartRef as Ref<SVGSVGElement>}
                        debounceResize={200}
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
