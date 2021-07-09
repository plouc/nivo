import { motionDefaultProps } from '@nivo/core'
// @ts-ignore
import { OrdinalColorScaleConfigScheme, InheritedColorConfigFromContext } from '@nivo/colors'
import { FillDirection } from './types'

export const defaultProps = {
    // hiddenIds: [],
    fillDirection: 'bottom' as FillDirection,
    padding: 1,
    colors: { scheme: 'nivo' } as OrdinalColorScaleConfigScheme,
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    borderWidth: 0,
    borderColor: { from: 'color', modifiers: [['darker', 1]] } as InheritedColorConfigFromContext,
    defs: [],
    fill: [],
    isInteractive: true,
    legends: [],
    animate: motionDefaultProps.animate,
    motionConfig: motionDefaultProps.config,
    role: 'img',
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
}
