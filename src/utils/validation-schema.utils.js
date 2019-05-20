/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const emailSchema = Joi.string()
  .lowercase()
  .trim()
  .email({
    minDomainAtoms: 2,
  })
  .required();

export const uuidSchema = Joi.string().guid({
  version: ['uuidv4', 'uuidv5'],
});

export const usernameSchema = Joi.string()
  .alphanum()
  .lowercase()
  .trim()
  .min(4)
  .required();

export const articleIdSchema = Joi.object({
  articleId: uuidSchema,
});

export const newUserSchema = Joi.object()
  .keys({
    fullName: Joi.string().trim(),
    username: Joi.string()
      .alphanum()
      .lowercase()
      .trim()
      .min(3)
      .required(),
    email: Joi.string()
      .lowercase()
      .trim()
      .email({
        minDomainAtoms: 2,
      })
      .required(),
    password: Joi.string()
      .alphanum()
      .min(8)
      .required(),
  })
  .options({ stripUnknown: true });

export const ratingSchema = Joi.object()
  .keys({
    rating: Joi.number()
      .min(0)
      .max(5)
      .required(),
  })
  .options({ stripUnknown: true });
