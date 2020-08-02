/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { blendModes } from '@nivo/core'
import ChoicesControl from './ChoicesControl'

const choices = blendModes.map(mode => ({
    label: mode,
    value: mode,
}))

const BlendModeControl = ({ options, ...props }) => (
    <ChoicesControl
        {...props}
        options={{
            ...options,
            choices,
        }}
    />
)

export default BlendModeControl
