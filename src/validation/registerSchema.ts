import * as joi from 'joi';

export const registerSchema = joi
  .object({
    type: joi
      .string()
      .insensitive()
      .trim()
      .valid('Investors', 'Asset listers')
      .required(),

    // tlds: { allow: false } to allow emails not on IANA list of registered TLDs.
    // default: true to allow emails only on IANA list of registered TLDs.
    email: joi
      .string()
      .trim()
      .email({ tlds: { allow: false } })
      .required(),

    fullName: joi.string().trim().required(),
  })
  .when('.type', {
    is: 'Asset listers',
    then: joi.object({
      description: joi.string().trim().required(),
    }),
  })
  .when('.type', {
    is: 'Investors',
    then: joi.object({
      description: joi.string().trim().allow('', null),
    }),
  })
  .unknown();
