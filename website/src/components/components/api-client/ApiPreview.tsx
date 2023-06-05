import React from 'react'
import styled from 'styled-components'

interface ApiPreviewProps {
    responseStatus: number | null
    chartUrl: string
}

export const ApiPreview = ({ responseStatus, chartUrl }: ApiPreviewProps) => {
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
}

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
