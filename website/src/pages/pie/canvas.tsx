import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { defaultProps, ResponsivePieCanvas } from '@nivo/pie'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/pie/meta.yml'
import mapper from '../../data/components/pie/mapper'
import { groups } from '../../data/components/pie/props'

const DATASET_SIZE = 24
const generateData = () =>
    generateProgrammingLanguageStats(true, DATASET_SIZE).map(d => ({
        id: d.label,
        ...d,
    }))

const initialProperties = {
    margin: {
        top: 40,
        right: 200,
        bottom: 40,
        left: 80,
    },
    valueFormat: { format: '', enabled: false },
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
    startAngle: 0,
    endAngle: 360,
    sortByValue: false,
    innerRadius: 0.5,
    padAngle: 0.6,
    cornerRadius: 2,
    fit: true,
    activeInnerRadiusOffset: defaultProps.activeInnerRadiusOffset,
    activeOuterRadiusOffset: 8,
    colors: { scheme: 'paired' },
    borderWidth: defaultProps.borderWidth,
    borderColor: defaultProps.borderColor,
    enableArcLinkLabels: true,
    arcLinkLabel: 'id',
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
    arcLabelsTextColor: '#333333',
    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,
    'showcase pattern usage': false,
    defs: [],
    fill: [],
    legends: [
        {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 140,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 60,
            itemHeight: 16,
            itemDirection: 'left-to-right',
            symbolSize: 16,
            symbolShape: 'square',
        },
    ],
}

const PieCanvas = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/pie-canvas.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="PieCanvas"
            meta={meta.PieCanvas}
            icon="pie"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
            getDataSize={data => data.length}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsivePieCanvas
                        data={data}
                        ref={chartRef as Ref<HTMLCanvasElement>}
                        debounceResize={200}
                        {...properties}
                        theme={theme}
                        onClick={slice => {
                            logAction({
                                type: 'click',
                                label: `[arc] ${slice.label}: ${slice.value}`,
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

export default PieCanvas
