import { ResponsiveProps } from '@nivo/core'
import { Bullet, ResponsiveBullet, BulletSvgProps } from '@nivo/bullet'
import { testChartResponsiveness } from '../../helpers/responsive'

const defaultData = [
    {
        id: 'A',
        ranges: [10, 20, 40],
        measures: [30],
        markers: [20],
    },
    {
        id: 'B',
        ranges: [100],
        measures: [20, 50],
        markers: [80],
    },
    {
        id: 'C',
        ranges: [50],
        measures: [10],
    },
]

const defaultResponsiveProps: ResponsiveProps<BulletSvgProps> = {
    data: defaultData,
    animate: false,
    role: 'chart',
}

const defaultProps: BulletSvgProps = {
    ...defaultResponsiveProps,
    width: 500,
    height: 300,
}

describe('Bullet', () => {
    it('should render a bullet chart', () => {
        cy.mount(<Bullet {...defaultProps} />)
    })

    testChartResponsiveness(defaults => (
        <ResponsiveBullet
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
            {...defaultResponsiveProps}
        />
    ))
})
