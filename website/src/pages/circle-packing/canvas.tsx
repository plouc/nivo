import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import range from 'lodash/range.js'
import random from 'lodash/random.js'
import { ResponsiveCirclePackingCanvas, canvasDefaultProps } from '@nivo/circle-packing'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/circle-packing/meta.yml'
import mapper from '../../data/components/circle-packing/mapper'
import { groups } from '../../data/components/circle-packing/props'

const NODE_COUNT = 800

const generateData = () => {
    return {
        name: 'root',
        children: range(NODE_COUNT).map(i => ({
            name: `node.${i}`,
            value: random(1, 100),
        })),
    }
}

const initialProperties = {
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
    id: 'name',
    value: 'value',
    valueFormat: { format: '', enabled: false },
    colors: { scheme: 'spectral' },
    colorBy: 'id',
    inheritColorFromParent: false,
    childColor: {
        from: 'color',
        modifiers: [['brighter', 0.4]],
    },
    padding: 1,
    leavesOnly: true,
    enableLabels: true,
    label: 'value',
    labelsSkipRadius: 8,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 2.4]],
    },
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    isInteractive: true,
    animate: false,
}

const CirclePackingCanvas = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(
                absolutePath: { glob: "**/src/assets/captures/circle-packing-canvas.png" }
            ) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate
            name="CirclePackingCanvas"
            meta={meta.CirclePackingCanvas}
            icon="circle-packing"
            flavors={meta.flavors}
            currentFlavor="canvas"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={canvasDefaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
            getDataSize={() => NODE_COUNT}
            image={image}
            location={location}
            enableChartDownload
        >
            {(properties, data, theme, logAction, chartRef) => {
                return (
                    <ResponsiveCirclePackingCanvas
                        data={data}
                        {...properties}
                        theme={theme}
                        ref={chartRef as Ref<HTMLCanvasElement>}
                        debounceResize={200}
                        onClick={node => {
                            logAction({
                                type: 'click',
                                label: `${node.id}: ${node.value}`,
                                color: node.color,
                                data: node,
                            })
                        }}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default CirclePackingCanvas
