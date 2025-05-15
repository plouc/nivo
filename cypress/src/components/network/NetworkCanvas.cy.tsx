import { ResponsiveProps } from '@nivo/core'
import {
    NetworkCanvas,
    ResponsiveNetworkCanvas,
    NetworkCanvasProps,
    InputNode,
    InputLink,
} from '@nivo/network'
import { testChartResponsiveness } from '../../helpers/responsive'
import { defaultData } from './shared'

const defaultResponsiveProps: ResponsiveProps<NetworkCanvasProps<InputNode, InputLink>> = {
    data: defaultData,
    margin: {
        top: 3,
        right: 3,
        bottom: 3,
        left: 3,
    },
    animate: false,
    role: 'chart',
}

const defaultProps: NetworkCanvasProps<InputNode, InputLink> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 500,
}

describe('NetworkCanvas', () => {
    it('should render a network chart', () => {
        cy.mount(<NetworkCanvas {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveNetworkCanvas
            pixelRatio={1}
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
