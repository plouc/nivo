/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createContext, useContext } from 'react'

export const tooltipContext = createContext()

export const useTooltip = () => useContext(tooltipContext)
