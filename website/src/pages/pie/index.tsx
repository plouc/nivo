import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { ResponsivePie, defaultProps } from '@nivo/pie'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/pie/meta.yml'
import mapper from '../../data/components/pie/mapper'
import { groups } from '../../data/components/pie/props'

const DATASET_SIZE = 5
const generateData = () =>
    generateProgrammingLanguageStats(true, DATASET_SIZE).map(d => ({
        id: d.label,
        ...d,
    }))

const initialProperties = {
    margin: {
        top: 40,
        right: 80,
        bottom: 80,
        left: 80,
    },
    valueFormat: { format: '', enabled: false },
    startAngle: defaultProps.startAngle,
    endAngle: defaultProps.endAngle,
    sortByValue: defaultProps.sortByValue,
    innerRadius: 0.5,
    padAngle: 0.6,
    cornerRadius: 2,
    fit: defaultProps.fit,
    activeInnerRadiusOffset: defaultProps.activeInnerRadiusOffset,
    activeOuterRadiusOffset: 8,
    colors: defaultProps.colors,
    borderWidth: defaultProps.borderWidth,
    borderColor: defaultProps.borderColor,
    enableArcLinkLabels: defaultProps.enableArcLinkLabels,
    arcLinkLabel: defaultProps.arcLinkLabel,
    arcLinkLabelsSkipAngle: 10,
    arcLinkLabelsTextOffset: 6,
    arcLinkLabelsTextColor: '#333333',
    arcLinkLabelsOffset: 0,
    arcLinkLabelsDiagonalLength: 16,
    arcLinkLabelsStraightLength: 24,
    arcLinkLabelsThickness: 2,
    arcLinkLabelsColor: { from: 'color' },
    enableArcLabels: true,
    arcLabel: 'formattedValue',
    arcLabelsRadiusOffset: 0.5,
    arcLabelsSkipAngle: 10,
    arcLabelsSkipRadius: 0,
    arcLabelsTextColor: {
        from: 'color',
        modifiers: [['darker', 2]],
    },
    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,
    'showcase pattern usage': false,
    defs: [],
    fill: [],
    animate: defaultProps.animate,
    motionConfig: defaultProps.motionConfig,
    transitionMode: defaultProps.transitionMode,
    legends: [
        {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            symbolSize: 16,
            symbolShape: 'circle',
        },
    ],
}

const Pie = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/pie.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="Pie"
            meta={meta.Pie}
            icon="pie"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaultProps}
            propertiesMapper={mapper}
            codePropertiesMapper={properties => ({
                ...properties,
                tooltip: properties.tooltip ? 'CustomTooltip' : undefined,
            })}
            generateData={generateData}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsivePie
                        data={data}
                        {...properties}
                        theme={theme}
                        ref={chartRef as Ref<SVGSVGElement>}
                        debounceResize={200}
                        onClick={slice => {
                            logAction({
                                type: 'click',
                                label: `[arc] ${slice.id}: ${slice.formattedValue}`,
                                color: slice.color,
                                data: slice,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Pie
