/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import LinesItem from './LinesItem'
import { LineGenerator, ComputedSerie } from './hooks';

interface LinesProps {
    lines: ComputedSerie[]
    lineGenerator: LineGenerator
    lineWidth: number
}

export default function Lines({ lines, lineGenerator, lineWidth }: LinesProps) {
    return (<>
        {lines.map(({ id, data, color }) => (
            <LinesItem
                key={id}
                points={data.map(d => d.position)}
                lineGenerator={lineGenerator}
                color={color}
                thickness={lineWidth}
            />
        ))}
    </>);
}
