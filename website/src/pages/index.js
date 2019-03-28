/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import Home from '../components/home/Home'
import SEO from '../components/seo'

const IndexPage = () => (
    <>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Home />
    </>
)

export default IndexPage
