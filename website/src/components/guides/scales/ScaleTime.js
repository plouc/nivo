/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { useTheme } from '../../../theming/context'
import { DescriptionBlock } from '../../styled'

const ScaleTime = () => {
    const theme = useTheme()

    return (
        <>
            <DescriptionBlock>
                <h2 id="time-scale">Time scales</h2>
                <p>@todo.</p>
            </DescriptionBlock>
        </>
    )
}

export default ScaleTime
