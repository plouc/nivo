/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { Container } from '../components/Container'

export const withContainer = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return class extends Component {
        render() {
            // eslint-disable-next-line react/prop-types
            const {
                theme,
                renderWrapper,
                animate,
                motionStiffness,
                motionDamping,
                motionConfig,
                ...childProps
            } = this.props

            return (
                <Container
                    theme={theme}
                    renderWrapper={renderWrapper}
                    isInteractive={childProps.isInteractive}
                    animate={animate}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                    motionConfig={motionConfig}
                >
                    <WrappedComponent {...childProps} />
                </Container>
            )
        }
    }
}
