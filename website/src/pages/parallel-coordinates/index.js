/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import merge from 'lodash/merge'
import { ResponsiveParallelCoordinates, commonDefaultProps } from '@nivo/parallel-coordinates'
import { generateParallelCoordinatesData } from '@nivo/generators'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/parallel-coordinates/meta.yml'
import mapper from '../../data/components/parallel-coordinates/mapper'
import { groups } from '../../data/components/parallel-coordinates/props'
import variables from '../../data/components/parallel-coordinates/variables'

const initialProperties = {
    variables,
    margin: {
        top: 50,
        right: 60,
        bottom: 50,
        left: 60,
    },
    layout: commonDefaultProps.layout,
    curve: commonDefaultProps.curve,
    colors: commonDefaultProps.colors,
    colorBy: commonDefaultProps.colorBy,
    strokeWidth: commonDefaultProps.strokeWidth,
    lineOpacity: commonDefaultProps.lineOpacity,
    axesPlan: commonDefaultProps.axesPlan,
    axesTicksPosition: commonDefaultProps.axesTicksPosition,
    animate: commonDefaultProps.animate,
    motionConfig: commonDefaultProps.motionConfig,
}

const generateData = () => generateParallelCoordinatesData({ size: 32 })

const ParallelCoordinates = () => {
    return (
        <ComponentTemplate
            name="ParallelCoordinates"
            meta={meta.ParallelCoordinates}
            icon="parallel-coordinates"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groups}
            initialProperties={initialProperties}
            defaultProperties={commonDefaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
        >
            {(properties, data, theme) => {
                return (
                    <ResponsiveParallelCoordinates
                        data={data}
                        {...properties}
                        theme={merge({}, theme, {
                            axis: {
                                ticks: {
                                    line: {
                                        strokeWidth: 2,
                                        strokeLinecap: 'square',
                                    },
                                },
                                domain: {
                                    line: {
                                        strokeWidth: 2,
                                        strokeLinecap: 'square',
                                    },
                                },
                            },
                        })}
                    />
                )
            }}
        </ComponentTemplate>
    )
}

export default ParallelCoordinates
