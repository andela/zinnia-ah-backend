import Joi from 'joi';
/**
 * This is the schema definition
 * for a new userAccount
 */
const newUserSchema = Joi.object().keys({
  fullName: Joi
    .string()
    .trim(),
  username: Joi
    .string()
    .alphanum()
    .lowercase()
    .trim()
    .min(8)
    .required(),
  email: Joi
    .string()
    .lowercase()
    .trim()
    .email({ minDomainAtoms: 2 })
    .required(),
  password: Joi
    .string()
    .alphanum()
    .min(8)
    .required(),
  passwordConfirmation: Joi
    .string()
    .required()
    .valid(Joi.ref('password'))
    .options({
      language: {
        any: {
          allowOnly: 'Passwords do not match!!',
        }
      }
    })
});

export default {
  newUserSchema,
};
