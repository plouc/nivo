/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { PartLabel } from './PartLabel'

export const PartLabels = ({ parts }) =>
    parts.map(part => <PartLabel key={part.data.id} part={part} />)
