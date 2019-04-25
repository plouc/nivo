/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { VoronoiDefaultProps as defaults } from '@nivo/voronoi'
import { getPropertiesGroupsControls } from '../../../lib/componentProperties'

const props = [
    {
        key: 'width',
        scopes: ['api'],
        help: 'Chart width.',
        description: `not required if using responsive alternative.`,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        scopes: ['api'],
        help: 'Chart height.',
        description: `not required if using responsive alternative.`,        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'margin',
        scopes: '*',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'isInteractive',
        scopes: ['VoronoiCirclePacking'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },

]

export const groupsByScope = {
    VoronoiCirclePacking: getPropertiesGroupsControls(props, 'VoronoiCirclePacking'),
    api: getPropertiesGroupsControls(props, 'api'),
}
