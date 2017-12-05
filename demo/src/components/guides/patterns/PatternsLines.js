import React, { Component } from 'react'
import classNames from 'classnames'
import CollapsibleCard from '../../CollapsibleCard'
import ComponentPropList from '../../properties/ComponentPropsList'
import { Defs, PatternLines, patternLinesDef } from '@nivo/core'

const SAMPLE_SIZE = 120

const configs = [
    { id: 'default', config: {} },
    { id: 'spacing', config: { spacing: 20 } },
    { id: 'rotation', config: { rotation: -45 } },
    { id: 'lineWidth', config: { rotation: -25, lineWidth: 10, spacing: 20 } },
    { id: 'color', config: { rotation: 15, color: '#e25d47' } },
    { id: 'background', config: { rotation: 45, background: '#e25d47' } },
]

const props = [
    {
        key: 'spacing',
        type: '{number}',
        default: PatternLines.defaultProps.spacing,
        description: 'spacing between lines.',
    },
    {
        key: 'rotation',
        type: '{number}',
        default: PatternLines.defaultProps.rotation,
        description: 'lines rotation (deg.).',
    },
    {
        key: 'lineWidth',
        type: '{number}',
        default: PatternLines.defaultProps.lineWidth,
        description: 'lines thickness (px).',
    },
    {
        key: 'background',
        type: '{string}',
        default: PatternLines.defaultProps.background,
        description: 'pattern background color.',
    },
    {
        key: 'color',
        type: '{string}',
        default: PatternLines.defaultProps.color,
        description: 'lines color.',
    },
]

export default class PatternsLines extends Component {
    state = {
        current: configs[0].id,
    }

    setCurrent = current => {
        this.setState({ current })
    }

    render() {
        const { current } = this.state

        const config = configs.find(({ id }) => id === current)
        const configId = `lines.${current}`

        return (
            <CollapsibleCard title="Lines: patternLinesDef()" expandedByDefault={true}>
                <div className="tabs__menu">
                    {configs.map(({ id }) => (
                        <div
                            key={id}
                            className={classNames('no-select tabs__menu__item', {
                                '_is-active': id === current,
                            })}
                            onClick={() => this.setCurrent(id)}
                        >
                            {id}
                        </div>
                    ))}
                </div>
                <div className="fill-sample">
                    <svg className="fill-sample__preview" width={SAMPLE_SIZE} height={SAMPLE_SIZE}>
                        <Defs defs={[patternLinesDef(configId, config.config)]} />
                        <rect width={SAMPLE_SIZE} height={SAMPLE_SIZE} fill={`url(#${configId})`} />
                    </svg>
                    <pre className="fill-sample__code">
                        {'// helper\n'}
                        {`patternLinesDef('${configId}', ${JSON.stringify(
                            config.config,
                            null,
                            '  '
                        )})\n`}
                        {'// plain object\n'}
                        {JSON.stringify(patternLinesDef(configId, config.config), null, '    ')}
                    </pre>
                </div>
                <ComponentPropList properties={props} compact />
            </CollapsibleCard>
        )
    }
}
