import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Home from '../components/home/Home'
import { Seo } from '../components/Seo'

const IndexPage = () => {
    const {
        image: {
            childImageSharp: { gatsbyImageData: image },
        },
    } = useStaticQuery(graphql`
        query {
            image: file(absolutePath: { glob: "**/src/assets/captures/pages/home.png" }) {
                childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 1200, quality: 100)
                }
            }
        }
    `)

    return (
        <>
            <Seo title="Home" keywords={[`dataviz`, `charts`, `react`, `svg`]} image={image} />
            <Home />
        </>
    )
}

export default IndexPage
