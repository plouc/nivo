/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class APISubmit extends Component {
    render() {
        const { loading, onClick } = this.props

        return (
            <span className="api-client_submit" onClick={onClick}>
                {loading ? 'sending' : 'generate'}
            </span>
        )
    }
}

APISubmit.propTypes = {
    loading: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}

APISubmit.defaultProps = {}

export default APISubmit
