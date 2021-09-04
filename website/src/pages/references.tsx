import React from 'react'
import Layout from '../components/Layout'
import { Seo } from '../components/Seo'
import PageContent from '../components/PageContent'
import { DescriptionBlock } from '../components/styled'
import { FaGithub } from 'react-icons/fa'
import styled from 'styled-components'

const references = [
    {
        name: 'State of JS 2020',
        url: 'https://2020.stateofjs.com/',
        github: 'https://github.com/StateOfJS/StateOfJS-2020',
    },
    {
        name: 'State of JS 2019',
        url: 'https://2019.stateofjs.com/',
        github: 'https://github.com/StateOfJS/StateOfJS-2019',
    },
    {
        name: 'State of JS 2018',
        url: 'https://2018.stateofjs.com/',
        github: 'https://github.com/StateOfJS/StateOfJS',
    },
    {
        name: 'State of JS 2017',
        url: 'https://2017.stateofjs.com/',
        github: 'https://github.com/StateOfJS/StateOfJS',
    },
    {
        name: 'State of CSS 2020',
        url: 'https://2020.stateofcss.com/',
        github: 'https://github.com/StateOfJS/StateOfCSS-2020',
    },
    {
        name: 'State of CSS 2019',
        url: 'https://2019.stateofcss.com/',
        github: 'https://github.com/StateOfJS/StateOfCSS-2019',
    },
    {
        name: 'Spacetime reviews',
        url: 'https://spacetime.graph.zone/',
        github: 'https://github.com/johnymontana/spacetime-reviews',
    },
]

const References = () => {
    return (
        <Layout>
            <PageContent>
                <Seo title="References" />
                <div className="guide__header">
                    <h1>References</h1>
                </div>
                <DescriptionBlock>
                    <p>
                        <a
                            href="https://github.com/plouc/nivo"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            nivo
                        </a>{' '}
                        was inspired by great projects who helped to imagine and develop all the
                        features.
                    </p>
                    <h2>References</h2>
                    <ul>
                        {references.map(reference => (
                            <li>
                                <a href={reference.url} target="_blank" rel="noopener noreferrer">
                                    {reference.name}
                                </a>
                                {reference.github && (
                                    <GitHubLink
                                        href={reference.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="GitHub"
                                    >
                                        <FaGithub />
                                    </GitHubLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </DescriptionBlock>
            </PageContent>
        </Layout>
    )
}

export default References

const GitHubLink = styled.a`
    text-decoration: none;
    text-transform: uppercase;
    border-bottom: none;
    margin-left: 10px;
    position: relative;
    justify-content: space-between;
    cursor: pointer;

    & svg {
        font-size: 20px;
    }
`
