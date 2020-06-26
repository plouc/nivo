/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { Dimensions } from '@nivo/core'

declare module '@nivo/treemap' {
    export interface TreeMapProps {
        data: any
    }

    export class TreeMap extends React.Component<TreeMapProps & Dimensions> {}
    export class ResponsiveTreeMap<T> extends React.Component<TreeMapProps> {}
}
