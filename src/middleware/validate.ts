// import { Request, Response, NextFunction } from 'express';
// import { AnyZodObject } from 'zod';

// const validate =
//   (schema: AnyZodObject) =>
//     (req: Request, res: Response, next: NextFunction) => {
//       try {
//         schema.parse({
//           body: req.body,
//           query: req.query,
//           params: req.params,
//         });
//         next();
//       } catch (e: any) {
//         return res.status(400).send(e.errors);
//       }
//     };

// export default validate;

import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as _Joi from '@hapi/joi';
import { Schema, ValidationOptions, ValidationResult, ValidationErrorItem } from '@hapi/joi';

interface IRoot extends _Joi.Root {
  file: any;
}
const imgMime = ['bmp', 'gif', 'jpg', 'png', 'svg', 'jpeg', 'apng', 'svgz', 'tiff', 'tif'];

const extension: any = {
  base: _Joi.object(),
  type: 'file',
  rules: {
    extension: {               // Rule supports multiple invocations
      method(q) {
        return this.$_addRule({ name: 'extension', args: { q } });
      },
      args: [
        {
          name: 'q',
          ref: true,
          assert: (value) => {
            const allowedTypes = Array.isArray(value) ? value : [value];
            const repeat = imgMime.filter((element, index, arr) => {
              return allowedTypes.includes(element);
            });
            return repeat.length > 0 ? allowedTypes : false;
          },
          message: 'must be a img type',
        },
      ],
      validate(value, helpers, args, options) {
        console.log(value.metadata.extension);
        if (args.q.includes(value.metadata.extension)) {
          return value;       // Value is valid
        }

        return helpers.error('file.extension', { q: args.q });
      },
    },
  },
};

export const Joi: IRoot = _Joi.extend(extension);

// 支援的express request 參數列表
const validateParams = [
  'headers',
  'params',
  'query',
  'body',
  'file',
];

type Parameter = 'headers' | 'params' | 'query' | 'body' | 'file';
/**
 * 可以支援多種參數同時驗證，但是你們要命名為這種方式
 * {
 *   body: Joi.object({}),
 *   query: Joi.object({}),
 * }
 */
export interface ICustomSchema {
  headers?: Schema;
  params?: Schema;
  query?: Schema;
  body?: Schema;
  file?: Schema;
}

const validateMiddleware = (customSchema: ICustomSchema, validationOptions: ValidationOptions): RequestHandler => {
  const requestHandler: RequestHandler = (request: Request, response: Response, next: NextFunction) => {

    const validateSingleParameter = (parameter: Parameter): ValidationResult =>
      (customSchema[parameter].validate(request[parameter], validationOptions));
    const results: ValidationErrorItem[] = validateParams
      .filter((parameter: Parameter) => (request[parameter] && customSchema[parameter]))
      .map((parameter: Parameter) => validateSingleParameter(parameter))
      .filter((validationResult: ValidationResult) => (validationResult.errors || validationResult.error))
      .reduce((errorArray, validationResult: ValidationResult) => {
        if (validationResult.error && validationResult.error.details) {
          return errorArray.concat(validationResult.error.details);
        }
        return errorArray;
      }, []);
    if (!results.length) {
      next();
    } else {
      // 如果有錯誤你們可以定義要怎麼樣處理
      // 範例是回傳 400
      response.status(400).send(results);
    }
  };
  return requestHandler;
};

export default validateMiddleware;