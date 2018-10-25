import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// .chart_header
const Header = styled.div`
    flex-direction: column;
    color: #fff;
    margin-bottom: 50px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    position: relative;
    height: 130px;
`

// .chart__title
const Title = styled.h1`
    display: flex;
    align-items: center;
    width: 100%;
`

class ChartHeader extends Component {
    shouldComponentUpdate() {
        return false
    }

    render() {
        const { chartClass, tags } = this.props

        return (
            <Header>
                <Title>{chartClass}</Title>
                <div className="component_meta">
                    {tags.map(tag => (
                        <span key={tag} className="component_meta_tag">
                            {tag}
                        </span>
                    ))}
                </div>
            </Header>
        )
    }
}

ChartHeader.propTypes = {
    chartClass: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
}

ChartHeader.defaultProps = {
    tags: [],
}

export default ChartHeader
