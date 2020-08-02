/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useContext } from 'react'
import { motionConfigContext } from './context'

export const useMotionConfig = () => useContext(motionConfigContext)
