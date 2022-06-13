import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
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
            // @ts-ignore
            data = omit(data, omitProps)
        }

        try {
            // @ts-ignore
            req.payload = schema.validate(data, {
                abortEarly: true,
                convert: true,
            })
            next()
        } catch (err: any) {
            return res.status(400).json({
                // @ts-ignore
                errors: err.details.map(({ message, path }) => {
                    return `${message}${path ? ` (${path})` : ''}`
                }),
            })
        }
    }
}
