import Joi from 'joi'

export const dimensions = {
    width: Joi.number().integer().required(),
    height: Joi.number().integer().required(),
    margin: Joi.object().keys({
        top: Joi.number().integer(),
        right: Joi.number().integer(),
        bottom: Joi.number().integer(),
        left: Joi.number().integer(),
    }),
}
