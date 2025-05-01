/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component } from 'react'
import { Container } from '../components/Container'

export const withContainer = WrappedComponent => {
    return class extends Component {
        render() {
            const { theme, renderWrapper, animate, motionConfig, ...childProps } = this.props

            return (
                <Container
                    theme={theme}
                    renderWrapper={renderWrapper}
                    isInteractive={childProps.isInteractive}
                    animate={animate}
                    motionConfig={motionConfig}
                >
                    <WrappedComponent {...childProps} />
                </Container>
            )
        }
    }
}
