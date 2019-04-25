/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ResponsiveSunburst } from '@nivo/sunburst'
import { generateLibTree } from '@nivo/generators'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/sunburst/meta.yml'
import mapper from '../../data/components/sunburst/mapper'
import { groups } from '../../data/components/sunburst/props'

const initialProperties = {
    margin: {
        top: 40,
        right: 20,
        bottom: 20,
        left: 20,
    },

    identity: 'name',
    value: 'loc',

    cornerRadius: 2,

    borderWidth: 1,
    borderColor: 'white',

    colors: { scheme: 'nivo' },
    childColor: {
        from: 'color',
    },

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,
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
            initialProperties={initialProperties}
            propertiesMapper={mapper}
            generateData={generateLibTree}
        >
            {(properties, data, theme) => {
                return <ResponsiveSunburst data={data} {...properties} theme={theme} />
            }}
        </ComponentTemplate>
    )
}

export default Sunburst
