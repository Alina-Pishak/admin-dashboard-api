// src/middleware/validateBody.ts
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodType } from 'zod';

export const validateBody = <T>(schema: ZodType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (err) {
       if (err instanceof ZodError) {
        const formattedErrors = err.issues.map(issue => ({
          field: issue.path.join("."),
          message: issue.message,
          code: issue.code,
        }));

        return res.status(400).json({
          message: "Validation error",
          errors: formattedErrors,
        });
      }



    next(err);

    }
  };
};
