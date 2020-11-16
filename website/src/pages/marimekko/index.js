import React from 'react'
import { ResponsiveMarimekko, defaultProps } from '@nivo/marimekko'
import { random, omit } from 'lodash'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/marimekko/meta.yml'
import mapper from '../../data/components/marimekko/mapper'
import { groups } from '../../data/components/marimekko/props'

const getRandomValue = () => random(0, 32)

const generateData = () =>
    ['A', 'B', 'C', 'D', 'E'].map(id => ({
        id,
        value: getRandomValue(),
        cool: getRandomValue(),
        notCool: getRandomValue(),
        yabai: getRandomValue(),
    }))

const initialProperties = {
    id: 'id',
    value: 'value',
    dimensions: [
        {
            id: 'cool stuff',
            value: 'cool',
        },
        {
            id: 'not cool stuff',
            value: 'notCool',
        },
        {
            id: 'YABAI!',
            value: 'yabai',
        },
    ],
    layout: defaultProps.layout,
    offset: defaultProps.offset,

    margin: {
        top: 40,
        right: 80,
        bottom: 80,
        left: 80,
    },

    valueFormat: { format: '', enabled: false },

    colors: { scheme: 'nivo' },

    borderWidth: 1,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.2]],
    },

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,
    'showcase pattern usage': true,

    defs: [],
    fill: [],

    animate: defaultProps.animate,
    motionConfig: defaultProps.motionConfig,

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
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
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

const Marimekko = () => {
    return (
        <ComponentTemplate
            name="Marimekko"
            meta={meta.Marimekko}
            icon="pie"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={defaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
        >
            {(properties, data, theme, logAction) => {
                const handleClick = bar => {
                    logAction({
                        type: 'click',
                        label: `[bar] ${bar.datum.id} - ${bar.id}: ${bar.value}`,
                        color: bar.color,
                        // prevent cyclic dependency
                        data: {
                            ...omit(bar, ['datum']),
                            datum: omit(bar.datum, ['dimensions']),
                        },
                    })
                }

                const handleLegendClick = legendItem => {
                    logAction({
                        type: 'click',
                        label: `[legend] ${legendItem.label}: ${legendItem.formattedValue}`,
                        color: legendItem.color,
                        data: legendItem,
                    })
                }

                return (
                    <ResponsiveMarimekko
                        data={data}
                        {...properties}
                        theme={theme}
                        onClick={handleClick}
                        legends={properties.legends.map(legend => ({
                            ...legend,
                            onClick: handleLegendClick,
                        }))}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default Marimekko
