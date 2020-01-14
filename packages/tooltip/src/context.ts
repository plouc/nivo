/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createContext } from 'react'

export type TooltipContextValue = [any, any]

// tslint:disable-next-line:variable-name
export const TooltipContext = createContext<TooltipContextValue>([] as any)
