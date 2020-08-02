/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { groupProperties } from '../../../lib/componentProperties'
import { props as geoProps } from '../geo/props'

const props = [...geoProps]

export const groups = groupProperties(props)
