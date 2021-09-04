import React from 'react'
import Home from '../components/home/Home'
import { Seo } from '../components/Seo'

const IndexPage = () => (
    <>
        <Seo title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Home />
    </>
)

export default IndexPage
