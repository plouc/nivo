import React from 'react'
import { defaultProps, ResponsiveSunburst } from '@nivo/sunburst'
import { generateLibTree } from '@nivo/generators'
import { omit } from 'lodash'
import { ComponentTemplate } from '../../components/components/ComponentTemplate'
import meta from '../../data/components/sunburst/meta.yml'
import mapper from '../../data/components/sunburst/mapper'
import { groups } from '../../data/components/sunburst/props'

const Tooltip = () => {
    /* return custom tooltip */
}

const generateData = () => generateLibTree()

const initialProperties = {
    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },
    id: 'name',
    value: 'loc',
    valueFormat: { format: '', enabled: false },
    cornerRadius: 2,
    borderWidth: 1,
    borderColor: { theme: 'background' },
    colors: { scheme: 'nivo' },
    colorBy: 'id',
    inheritColorFromParent: true,
    childColor: {
        from: 'color',
        modifiers: [['brighter', 0.1]],
    },
    enableArcLabels: true,
    arcLabel: 'formattedValue',
    arcLabelsRadiusOffset: 0.5,
    arcLabelsSkipAngle: 10,
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
    tooltip: null,
    'showcase pattern usage': false,
}

const Sunburst = () => {
    return (
        <ComponentTemplate
            name="Sunburst"
            meta={meta.Sunburst}
            icon="sunburst"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            defaultProperties={defaultProps}
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            generateData={generateData}
        >
            {(properties, data, theme, logAction) => {
                return (
                    <ResponsiveSunburst
                        data={data}
                        {...properties}
                        theme={theme}
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
