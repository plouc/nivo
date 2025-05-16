import React, { Ref } from 'react'
import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { defaultProps, ResponsiveSunburst } from '@nivo/sunburst'
import { generateLibTree } from '@nivo/generators'
import { omit } from 'lodash'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/sunburst/meta.yml'
import mapper, {
    UnmappedSunburstProps,
    MappedSunburstProps,
} from '../../data/components/sunburst/mapper'
import { groups } from '../../data/components/sunburst/props'

const generateData = () =>
    generateLibTree(undefined, undefined, undefined, {
        withColors: false,
        idKey: 'id',
        valueKey: 'value',
    })

const initialProperties: UnmappedSunburstProps = {
    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },
    valueFormat: { format: '', enabled: false },
    cornerRadius: 2,
    borderWidth: 1,
    borderColor: { theme: 'background' },
    colors: { scheme: 'nivo' },
    colorBy: 'id',
    inheritColorFromParent: true,
    childColor: defaultProps.childColor,
    enableArcLabels: true,
    arcLabel: 'formattedValue',
    arcLabelsRadiusOffset: 0.5,
    arcLabelsSkipAngle: 10,
    arcLabelsSkipRadius: 0,
    arcLabelsTextColor: {
        from: 'color',
        modifiers: [['darker', 1.4]],
    },
    animate: defaultProps.animate,
    motionConfig: defaultProps.motionConfig,
    transitionMode: defaultProps.transitionMode,
    defs: [],
    fill: [],
    isInteractive: true,
    'custom tooltip example': false,
    'showcase pattern usage': false,
}

const Sunburst = ({ location }: PageProps) => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/sunburst.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 700, quality: 100)
                }
            }
        }
    `)

    return (
        <ComponentTemplate<UnmappedSunburstProps, MappedSunburstProps, any>
            name="Sunburst"
            meta={meta.Sunburst}
            icon="sunburst"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            defaultProperties={defaultProps}
            initialProperties={initialProperties}
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
                    <ResponsiveSunburst
                        {...properties}
                        data={data}
                        theme={theme}
                        ref={chartRef as Ref<SVGSVGElement>}
                        debounceResize={200}
                        onClick={node =>
                            logAction({
                                type: 'click',
                                label: `[sunburst] ${node.id} - ${node.value}: ${
                                    Math.round(node.percentage * 100) / 100
                                }%`,
                                color: node.color,
                                // prevent cyclic dependency
                                data: {
                                    ...omit(node, ['parent']),
                                    parent: omit(node.parent, ['data', 'parent', 'children']),
                                },
                            })
                        }
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Sunburst
