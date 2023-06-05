import Joi from 'joi'
import { colorSchemeIds } from '@bitbloom/nivo-colors'

export const ordinalColors = Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.object().keys({
        scheme: Joi.valid(...colorSchemeIds).required(),
        size: Joi.number(),
    }),
    Joi.object().keys({
        datum: Joi.string().required(),
    })
)

export const inheritedColor = Joi.alternatives().try(
    Joi.string(),
    Joi.object().keys({
        theme: Joi.string().required(),
    }),
    Joi.object().keys({
        from: Joi.string().required(),
        modifiers: Joi.array(),
    })
)
