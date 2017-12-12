/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import ComponentPropsDocumentation from '../../../properties/ComponentPropsDocumentation'

const properties = [
    {
        key: 'xScale',
        type: '{Function}',
        required: true,
    },
    {
        key: 'yScale',
        type: '{Function}',
        required: true,
    },
    {
        key: 'height',
        type: '{number}',
        required: true,
    },
    {
        key: 'curve',
        type: '{string}',
        required: true,
    },
    {
        key: 'animate',
        type: '{boolean}',
        required: true,
    },
    {
        key: 'motionDamping',
        type: '{number}',
        required: true,
    },
    {
        key: 'motionStiffness',
        type: '{number}',
        required: true,
    },
]

export default class LineAreaSvg extends PureComponent {
    render() {
        return (
            <div>
                <h2>LineAreaSvg</h2>
                <ComponentPropsDocumentation chartClass="LineAreaSvg" properties={properties} />
            </div>
        )
    }
}
