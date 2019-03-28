/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Link = styled.a`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`

const EmptyContainer = styled.div`
    font-size: 14px;
    line-height: 1.6em;
    color: ${({ theme }) => theme.colors.textLight};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

const ApiPreview = ({ responseStatus, chartUrl }) => {
    if (responseStatus === 201 && chartUrl) {
        return (
            <Link href={chartUrl} target="_blank" rel="noopener noreferrer">
                <Image src={chartUrl} alt="api result" />
            </Link>
        )
    }

    return (
        <EmptyContainer>
            Click the generate button in order to generate the chart.
            <br />
            You can customize settings by using dedicated controls.
        </EmptyContainer>
    )

    return <div className="api-client_preview">{content}</div>
}

ApiPreview.propTypes = {
    responseStatus: PropTypes.number,
    chartUrl: PropTypes.string,
}

export default ApiPreview
