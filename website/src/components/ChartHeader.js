import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ChartHeader extends Component {
    shouldComponentUpdate() {
        return false
    }

    render() {
        const { chartClass, tags } = this.props

        return (
            <div className="chart_header">
                <h1 className="chart__title">{chartClass}</h1>
                <div className="component_meta">
                    {tags.map(tag => (
                        <span key={tag} className="component_meta_tag">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
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
