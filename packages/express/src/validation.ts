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
            if (omitProps) {
            data = omit(data, omitProps as any)
            }

        const { value, error } = schema.validate(data, {
            abortEarly: true,
            convert: true,
            // The website API pages send extra UI-only keys; accept and strip anything unknown.
            allowUnknown: true,
            stripUnknown: { objects: true },
        })

        if (error) {
            return res.status(400).json({
                errors: error.details.map(({ message, path }) => {
                    return `${message}${path ? ` (${path})` : ''}`
                }),
            })
        }

        // @ts-expect-error no type for req.payload
        req.payload = value
        next()
    }
}
