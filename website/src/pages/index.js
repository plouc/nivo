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
