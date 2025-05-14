import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { generateWinesTastes } from '@nivo/generators'
import { ResponsiveRadar, svgDefaultProps } from '@nivo/radar'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/radar/meta.yml'
import mapper, { UnmappedRadarProps, MappedRadarProps } from '../../data/components/radar/mapper'
import { groups } from '../../data/components/radar/props'

const initialProperties: UnmappedRadarProps = {
    indexBy: 'taste',
    maxValue: 'auto',
    valueFormat: { format: '>-.2f', enabled: false },
    margin: {
        top: 70,
        right: 80,
        bottom: 40,
        left: 80,
    },
    curve: 'linearClosed',
    borderWidth: 2,
    borderColor: { from: 'color' },
    gridLevels: 5,
    gridShape: 'circular',
    gridLabelOffset: 36,
    enableDots: svgDefaultProps.enableDots,
    dotSize: 10,
    dotColor: { theme: 'background' },
    dotBorderWidth: 2,
    dotBorderColor: svgDefaultProps.dotBorderColor,
    enableDotLabel: svgDefaultProps.enableDotLabel,
    dotLabel: svgDefaultProps.dotLabel,
    dotLabelYOffset: svgDefaultProps.dotLabelYOffset,
    colors: { scheme: 'nivo' },
    fillOpacity: 0.25,
    blendMode: 'multiply',
    animate: svgDefaultProps.animate,
    motionConfig: svgDefaultProps.motionConfig,
    isInteractive: svgDefaultProps.isInteractive,
    legends: [
        {
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 16,
            symbolShape: 'circle',
        },
    ],
}

const Radar = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/radar.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate<UnmappedRadarProps, MappedRadarProps, any>
            name="Radar"
            meta={meta.Radar}
            icon="radar"
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
            generateData={generateWinesTastes}
            getTabData={data => data.data}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveRadar
                        data={data.data}
                        keys={data.keys}
                        {...properties}
                        theme={theme}
                        ref={chartRef as Ref<SVGSVGElement>}
                        debounceResize={200}
                        onClick={slice =>
                            logAction({
                                type: 'click',
                                label: `[slice] {${Object.entries(slice)
                                    .map(([key, value]) => `${key}: ${value}`)
                                    .join(', ')}}`,
                                color: slice.color,
                                data: slice,
                            })
                        }
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Radar
