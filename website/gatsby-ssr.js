/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PageWrapper from './src/components/PageWrapper'

export const wrapRootElement = ({ element }) => {
    return (
        <PageWrapper>
            {element}
        </PageWrapper>
    )
}