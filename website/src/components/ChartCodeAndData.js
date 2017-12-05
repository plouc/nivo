import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChartCode from './ChartCode'
import JsonData from './JsonData'

class ChartCodeAndData extends Component {
    render() {
        const { code, data, onDataUpdate } = this.props

        return (
            <div>
                <ChartCode code={code} />
                {data && <JsonData data={data} onDataUpdate={onDataUpdate} />}
            </div>
        )
    }
}

const { func } = PropTypes

ChartCodeAndData.propTypes = {
    onDataUpdate: func,
}

export default ChartCodeAndData
