import { Margin } from '@nivo/core'
import { TreeCanvas, ResponsiveTreeCanvas, TreeCanvasProps } from '@nivo/tree'
import { testChartResponsiveness } from '../../helpers/responsive'
import { Datum, defaultData } from './shared'

const responsiveDefaultProps: Required<
    Pick<
        TreeCanvasProps<Datum>,
        | 'data'
        | 'nodeSize'
        | 'linkThickness'
        | 'activeLinkThickness'
        | 'inactiveLinkThickness'
        | 'animate'
        | 'role'
    >
> & {
    margin: Margin
    activeNodeSize: number
    inactiveNodeSize: number
} = {
    data: defaultData,
    margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    },
    nodeSize: 12,
    activeNodeSize: 24,
    inactiveNodeSize: 8,
    linkThickness: 2,
    activeLinkThickness: 12,
    inactiveLinkThickness: 1,
    animate: false,
    role: 'chart',
}

const defaultProps: Required<
    Pick<
        TreeCanvasProps<Datum>,
        | 'data'
        | 'width'
        | 'height'
        | 'nodeSize'
        | 'linkThickness'
        | 'activeLinkThickness'
        | 'inactiveLinkThickness'
        | 'animate'
    >
> & {
    margin: Margin
    activeNodeSize: number
    inactiveNodeSize: number
} = {
    ...responsiveDefaultProps,
    width: 640,
    height: 640,
}

describe('TreeCanvas', () => {
    beforeEach(() => {
        cy.viewport(defaultProps.width, defaultProps.height)
    })

    it('should render a tree graph', () => {
        cy.mount(<TreeCanvas<Datum> {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveTreeCanvas
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            pixelRatio={1}
            {...responsiveDefaultProps}
        />
    ))
})
