import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';
import Joi from 'joi';
export declare const validate: (schema: Joi.Schema, options?: {
    omit?: string[];
}) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validation.d.ts.map