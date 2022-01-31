import { Request, Response, NextFunction } from 'express';
//* Include all validators
import Validators from '../validation';

export default (validator: string) => {
  //! If validator is not exist, throw err
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await Validators[validator].validateAsync(req.body, {
        errors: {
          wrap: {
            label: '',
          },
        },
        abortEarly: false,
      });
      req.body = validated;
      next();
    } catch (err: any) {
      // Custom Error
      const CustomError = {
        status: 422,
        error: 'Invalid request data. Please review request and try again.',
      };

      return next(
        err
          ? {
              status: 422,
              message: 'Validation error',
              error: err.message.split('. '),
            }
          : CustomError,
      );
    }
  };
};
