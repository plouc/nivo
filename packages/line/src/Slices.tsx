/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import SlicesItem from './SlicesItem'
import { Slice } from './hooks'
import { SliceTooltipProps } from './SliceTooltip';

interface SlicesProps {
    slices: Slice[]
    axis: 'x' | 'y'
    debug: boolean
    height: number
    tooltip: React.ComponentClass<SliceTooltipProps>
    current: Slice | null
    setCurrent: React.Dispatch<React.SetStateAction<Slice | null>>
}

export default function Slices({ slices, axis, debug, height, tooltip, current, setCurrent }: SlicesProps) {
    return (
        <>
            {slices.map(slice => (
                <SlicesItem
                    key={slice.id}
                    slice={slice}
                    axis={axis}
                    debug={debug}
                    height={height}
                    tooltip={tooltip}
                    setCurrent={setCurrent}
                    isCurrent={current !== null && current.id === slice.id}
                />
            ))}
        </>
    );
}
