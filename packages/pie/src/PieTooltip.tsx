/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { ComputedDatum } from './types'

// prettier-ignore
export const PieTooltip = <R, >({ datum }: { datum: ComputedDatum<R> }) => (
    <BasicTooltip
        id={datum.id}
        value={datum.formattedValue}
        enableChip={true}
        color={datum.color}
    />
)

export default PieTooltip
