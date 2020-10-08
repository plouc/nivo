import { FunctionComponent } from 'react'
import Joi from 'joi'
import { Sankey, SankeySvgProps, sankeyAlignmentPropKeys } from '@bitbloom/nivo-sankey'
import { OmitStrict } from '../types'
import { ordinalColors, inheritedColor } from './commons/colors'
import { dimensions } from './commons/dimensions'
import { blendMode, custom } from './common'

// filter out all dynamic properties
export type SankeyApiProps = OmitStrict<
    SankeySvgProps<any, any>,
    | 'layers'
    | 'nodeHoverOpacity'
    | 'nodeHoverOthersOpacity'
    | 'linkHoverOpacity'
    | 'linkHoverOthersOpacity'
    | 'isInteractive'
    | 'onClick'
    | 'nodeTooltip'
    | 'linkTooltip'
    | 'renderWrapper'
    | 'role'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
>

export const sankeyMapping = {
    component: Sankey as FunctionComponent<SankeyApiProps>,
    schema: Joi.object<SankeyApiProps>().keys({
        width: dimensions.width,
        height: dimensions.height,
        margin: dimensions.margin,

        data: custom
            .object()
            .keys({
                nodes: Joi.array()
                    .items(
                        Joi.object()
                            .keys({
                                id: Joi.alternatives().try(Joi.string(), Joi.number()),
                            })
                            .unknown()
                    )
                    .required(),
                links: Joi.array()
                    .items(
                        Joi.object()
                            .keys({
                                source: Joi.alternatives().try(Joi.string(), Joi.number()),
                                target: Joi.alternatives().try(Joi.string(), Joi.number()),
                                value: Joi.number().min(0).required(),
                            })
                            .unknown()
                    )
                    .required(),
            })
            .required(),

        layout: Joi.valid('horizontal', 'vertical'),
        align: Joi.any().valid(...sankeyAlignmentPropKeys),
        sort: Joi.valid('auto', 'input', 'ascending', 'descending'),

        nodeOpacity: Joi.number().min(0).max(1),
        nodeThickness: Joi.number().min(1),
        nodeSpacing: Joi.number().min(0),
        nodeInnerPadding: Joi.number().min(0),
        nodeBorderRadius: Joi.number().min(0),
        nodeBorderWidth: Joi.number().min(0),
        nodeBorderColor: inheritedColor,

        linkOpacity: Joi.number().min(0).max(1),
        linkContract: Joi.number(),
        linkBlendMode: blendMode,
        enableLinkGradient: Joi.boolean(),

        enableLabels: Joi.boolean(),
        labelPosition: Joi.any().valid('inside', 'outside'),
        labelPadding: Joi.number(),
        labelOrientation: Joi.any().valid('horizontal', 'vertical'),
        labelTextColor: inheritedColor,

        colors: ordinalColors,
    }),
    runtimeProps: ['width', 'height', 'colors'],
    defaults: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        linkBlendMode: 'normal',
    },
}
