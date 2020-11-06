import { compose, defaultProps, pure } from 'recompose'
// @ts-ignore
import { withDimensions, withTheme, withMotion } from '@nivo/core'
import { defaultProps as bulletDefaultProps } from './props'

const commonEnhancers = [withDimensions(), withTheme()]

export default (Component: React.ComponentType<any>) => {
    switch (Component.displayName) {
        case 'Bullet':
            return compose(
                ...[defaultProps(bulletDefaultProps), ...commonEnhancers, withMotion(), pure]
            )(Component)
    }

    return Component
}
