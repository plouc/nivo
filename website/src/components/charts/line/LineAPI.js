/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import APIClient from '../../api-client/APIClient'
import LineControls from './LineControls'
import propsMapper from './propsMapper'

const LineAPI = ({ data }) => (
    <APIClient
        componentName="Line"
        apiPath="/charts/line"
        dataProperty="data"
        controls={LineControls}
        propsMapper={propsMapper}
        defaultProps={{
            data: JSON.stringify(data, null, '  '),
        }}
    />
)

export default LineAPI
