import { ResponsiveLineCanvas } from '@nivo/line'
import { testChartResponsiveness } from '../../helpers/responsive'
import { defaultData } from './shared'

describe('LineCanvas', () => {
    testChartResponsiveness(defaults => (
        <ResponsiveLineCanvas
            data={defaultData}
            role="chart"
            pixelRatio={1}
            defaultWidth={defaults?.[0]}
            defaultHeight={defaults?.[1]}
        />
    ))
})
