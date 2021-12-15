import Joi from 'joi'

export const linearScale = Joi.object().keys({
    type: Joi.valid('linear').required(),
    min: Joi.alternatives().try(Joi.valid('auto'), Joi.number()),
    max: Joi.alternatives().try(Joi.valid('auto'), Joi.number()),
    stacked: Joi.boolean(),
})

export const pointScale = Joi.object().keys({
    type: Joi.valid('point').required(),
})

export const timeScale = Joi.object().keys({
    type: Joi.valid('time').required(),
    format: Joi.string().required(),
    precision: Joi.string().required(),
})

export const scale = Joi.alternatives().try(linearScale, pointScale, timeScale)
