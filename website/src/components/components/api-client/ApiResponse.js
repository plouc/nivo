import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background: ${({ theme }) => theme.colors.cardBackground};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    overflow-x: hidden;
    overflow-y: auto;
`

const Header = styled.div`
    padding: 12px 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`

const ResponseJson = styled.pre`
    padding: 12px 20px;
    font-size: 13px;
    line-height: 1.6em;
    overflow: hidden;
    width: 100%;
    margin: 0;
`

class ApiResponse extends Component {
    render() {
        const { responseStatus, response } = this.props

        let responseContent = 'no response available'
        if (response) {
            responseContent = JSON.stringify(response, null, '  ')
        }

        return (
            <Container>
                <Header>
                    Response {responseStatus ? <strong>{responseStatus}</strong> : 'n/a'}
                </Header>
                <ResponseJson>{responseContent}</ResponseJson>
            </Container>
        )
    }
}

ApiResponse.propTypes = {}

ApiResponse.defaultProps = {}

export default ApiResponse
