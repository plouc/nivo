import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ChartHeader extends Component {
    shouldComponentUpdate() {
        return false
    }

    render() {
        const { chartClass, tags, diceRoll } = this.props

        return (
            <div className="chart_header">
                <h1 className="chart__title">
                    {chartClass}
                    {diceRoll && (
                        <span className="dice-roll no-select" onClick={diceRoll}>
                            roll the dice
                        </span>
                    )}
                </h1>
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
    diceRoll: PropTypes.func,
}

ChartHeader.defaultProps = {
    tags: [],
}

export default ChartHeader
