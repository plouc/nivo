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
import { Title2, Title3 } from '../../titles'
import { DescriptionBlock } from '../../styled'

const ScaleTime = () => {
    const theme = useTheme()

    return (
        <>
            <DescriptionBlock>
                <Title2 id="time-scale">Time scales</Title2>
                <p>
                    Time scales can be used to map an input domain comprised of dates to a
                    continuous output range, they support both native Date objects and strings.
                </p>
                <Title3 id="time-scale-native">Time scale using native Date object</Title3>
                <Title3 id="time-scale-string">Time scale using strings</Title3>
            </DescriptionBlock>
        </>
    )
}

export default ScaleTime
