/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Separator } from './Separator'

export const Separators = ({ beforeSeparators, afterSeparators }) => (
    <>
        {beforeSeparators.map(separator => (
            <Separator key={separator.partId} separator={separator} />
        ))}
        {afterSeparators.map(separator => (
            <Separator key={separator.partId} separator={separator} />
        ))}
    </>
)
