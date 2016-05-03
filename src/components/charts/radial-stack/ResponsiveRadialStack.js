import React, { Component, PropTypes } from 'react';
import RadialStack                     from './RadialStack';
import Dimensions                      from 'react-dimensions';


class ResponsiveRadialStack extends Component {
    render() {
        const { containerWidth, containerHeight } = this.props;

        return (
            <RadialStack
                width={containerWidth}
                height={containerHeight}
                {...this.props}
            />
        );
    }
}

ResponsiveRadialStack.displayName = 'ResponsiveRadialStack';


export default Dimensions()(ResponsiveRadialStack);
