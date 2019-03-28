/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import media from '../../theming/mediaQueries'

const Container = styled.div`
    flex-direction: column;
    color: #fff;
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    position: relative;
    height: 130px;
    padding: 0 30px;

    ${media.desktopLarge`
        & {
            padding: 0 40px;
        }
    `}

    ${media.desktop`
        & {
            padding: 0 30px;
        }
    `}

    ${media.tablet`
        & {
            padding: 0 20px;
        }
    `}

    ${media.mobile`
        & {
            padding: 0 20px;
        }
    `}
`

const Title = styled.h1`
    margin: 0 0 10px;
    padding: 0;
`

const Tags = styled.div``

const Tag = styled.span`
    display: inline-block;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.accent};
    font-size: 0.8rem;
    font-weight: 500;
    padding: 3px 11px;
    border-radius: 2px;
    margin-right: 7px;
    margin-bottom: 7px;
`

const ComponentHeader = memo(({ chartClass, tags }) => {
    return (
        <Container>
            <Title>{chartClass}</Title>
            <Tags>
                {tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </Tags>
        </Container>
    )
})

ComponentHeader.propTypes = {
    chartClass: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
}

ComponentHeader.defaultProps = {
    tags: [],
}

export default ComponentHeader
