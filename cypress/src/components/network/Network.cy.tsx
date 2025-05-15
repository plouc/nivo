import { ResponsiveProps } from '@nivo/core'
import { Network, ResponsiveNetwork, NetworkSvgProps, InputNode, InputLink } from '@nivo/network'
import { testChartResponsiveness } from '../../helpers/responsive'
import { defaultData } from './shared'

const defaultResponsiveProps: ResponsiveProps<NetworkSvgProps<InputNode, InputLink>> = {
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

const defaultProps: NetworkSvgProps<InputNode, InputLink> = {
    ...defaultResponsiveProps,
    width: 500,
    height: 500,
}

describe('Network', () => {
    it('should render a network chart', () => {
        cy.mount(<Network {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveNetwork
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
