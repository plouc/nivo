/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createContext } from 'react'

export type TooltipContextValue = {
    showTooltipAt: any
    showTooltipFromEvent: any
    hideTooltip: any
}

export const TooltipContext = createContext<TooltipContextValue>([] as any)
