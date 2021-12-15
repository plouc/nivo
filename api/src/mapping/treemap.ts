import { FunctionComponent } from 'react'
import Joi from 'joi'
import { Dimensions } from '@nivo/core'
import { TreeMap, TreeMapSvgProps } from '@nivo/treemap'
import { custom } from './common'
import { ordinalColors, inheritedColor } from './commons/colors'
import { dimensions } from './commons/dimensions'
import { OmitStrict } from '../lib/types'

export type TreeMapApiProps = OmitStrict<
    TreeMapSvgProps & Dimensions,
    'isInteractive' | 'onMouseEnter' | 'onMouseMove' | 'onMouseLeave' | 'onClick' | 'animate'
>

const treeMapMapping = {
    component: TreeMap as unknown as FunctionComponent<TreeMapApiProps>,
    schema: Joi.object<TreeMapApiProps>().keys({
        data: custom.object().required(),
        identity: Joi.string(),
        value: Joi.string(),
        valueFormat: Joi.string(),
        tile: Joi.any().valid('binary', 'squarify', 'slice', 'dice', 'sliceDice', 'resquarify'),
        leavesOnly: Joi.boolean(),
        innerPadding: Joi.number().min(0),
        outerPadding: Joi.number().min(0),
        width: dimensions.width,
        height: dimensions.height,
        margin: dimensions.margin,

        colors: ordinalColors,
        colorBy: Joi.string(),
        nodeOpacity: Joi.number().min(0).max(1),
        borderWidth: Joi.number().min(0),
        borderColor: inheritedColor,

        enableLabel: Joi.boolean(),
        label: Joi.string(),
        labelSkipSize: Joi.number(),
        orientLabel: Joi.boolean(),
        labelTextColor: inheritedColor,
        enableParentLabel: Joi.boolean(),
        parentLabel: Joi.string(),
        parentLabelSize: Joi.number().min(0),
        parentLabelPosition: Joi.any().valid('top', 'right', 'bottom', 'left'),
        parentLabelPadding: Joi.number().min(0),
        parentLabelTextColor: inheritedColor,
    }),
    runtimeProps: [
        'width',
        'height',
        'colors',
        'leavesOnly',
        'tile',
        'enableLabels',
        'orientLabels',
        'label',
        'labelFormat',
        'labelSkipSize',
        'labelTextColor',
        'innerPadding',
        'outerPadding',
        'colors',
        'borderWidth',
        'borderColor',
    ],
    defaults: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
}

export default treeMapMapping
