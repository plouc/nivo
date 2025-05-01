import { Request, Response, NextFunction } from 'express'
import omit from 'lodash/omit.js'
import Joi from 'joi'

export const validate = (
    schema: Joi.Schema,
    options: {
        omit?: string[]
    } = {}
) => {
    const { omit: omitProps } = options

    return (req: Request, res: Response, next: NextFunction) => {
        let data = req.body
        if (omit) {
            // @ts-expect-error omitProps is not PropertyName[] for simplicity
            data = omit(data, omitProps)
        }

        try {
            // @ts-expect-error no type for req.payload
            req.payload = schema.validate(data, {
                abortEarly: true,
                convert: true,
            })
            next()
        } catch (err: any) {
            return res.status(400).json({
                // @ts-expect-error no type for err
                errors: err.details.map(({ message, path }) => {
                    return `${message}${path ? ` (${path})` : ''}`
                }),
            })
        }
    }
}
