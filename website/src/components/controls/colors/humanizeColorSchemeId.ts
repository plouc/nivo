import { startCase } from 'lodash'
import { ColorSchemeId } from '@nivo/colors'

export const humanizeColorSchemeId = (schemeId: ColorSchemeId) => {
    const parts = schemeId.split('_').map(startCase)

    return parts.join(' → ')
}
