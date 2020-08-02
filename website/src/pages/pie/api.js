/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import SEO from '../../components/seo'
import ApiClient from '../../components/components/api-client/ApiClient'
import { groups } from '../../data/components/pie/props'
import mapper from '../../data/components/pie/mapper'
import meta from '../../data/components/pie/meta.yml'

const DATASET_SIZE = 12
const generateData = () =>
    generateProgrammingLanguageStats(true, DATASET_SIZE).map(d => ({
        id: d.label,
        ...d,
    }))

const data = generateData()

const PieApi = () => {
    return (
        <>
            <SEO title="Pie HTTP API" keywords={[...meta.Pie.tags, 'HTTP API']} />
            <ApiClient
                componentName="Pie"
                chartClass="pie"
                apiPath="/charts/pie"
                flavors={meta.flavors}
                dataProperty="data"
                controlGroups={groups}
                propsMapper={mapper}
                defaultProps={{
                    width: 800,
                    height: 800,

                    margin: {
                        top: 40,
                        right: 80,
                        bottom: 80,
                        left: 80,
                    },

                    startAngle: 0,
                    endAngle: 360,
                    sortByValue: false,
                    innerRadius: 0.5,
                    padAngle: 0.7,
                    cornerRadius: 3,
                    fit: true,

                    colors: { scheme: 'nivo' },

                    borderWidth: 1,
                    borderColor: {
                        from: 'color',
                        modifiers: [['darker', 0.2]],
                    },

                    enableRadialLabels: true,
                    radialLabel: 'id',
                    radialLabelsSkipAngle: 10,
                    radialLabelsTextXOffset: 6,
                    radialLabelsTextColor: '#333333',
                    radialLabelsLinkOffset: 0,
                    radialLabelsLinkDiagonalLength: 16,
                    radialLabelsLinkHorizontalLength: 24,
                    radialLabelsLinkStrokeWidth: 1,
                    radialLabelsLinkColor: { from: 'color' },

                    enableSlicesLabels: true,
                    sliceLabel: 'value',
                    slicesLabelsSkipAngle: 10,
                    slicesLabelsTextColor: '#333333',

                    data: JSON.stringify(data, null, '  '),
                }}
            />
        </>
    )
}

export default PieApi
