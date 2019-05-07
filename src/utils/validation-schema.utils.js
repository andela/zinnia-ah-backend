import Joi from 'joi';

import {
  PLAGIARISM,
  PROFANITY,
  DISCRIMINATORY,
  ADULT_CONTENT,
  TERRORISM,
  OTHER,
  ADMIN,
  AUTHOR,
} from './constants';

const stringSchema = Joi.string().trim();
const numberSchema = Joi.number();

const email = stringSchema
  .email({
    minDomainAtoms: 2,
  })
  .required();

const usernameSchema = stringSchema
  .alphanum()
  .lowercase()
  .min(4)
  .required();

const options = {
  stripUnknown: true,
  convert: true,
};

export const uuidSchema = Joi.string().guid();

export const articleId = Joi.object({
  articleId: uuidSchema.required(),
}).options({ ...options });

export const tokenId = Joi.object()
  .keys({
    id: uuidSchema.required(),
  })
  .options({ ...options });

export const highlightAndArticle = articleId
  .keys({
    id: uuidSchema.required(),
    articleId: uuidSchema.required(),
  })
  .options({ ...options });

export const highlightBody = Joi.object()
  .keys({
    highlightedText: stringSchema.required(),
    startIndex: numberSchema.required(),
    stopIndex: numberSchema.required(),
    comment: stringSchema.required(),
  })
  .options({ ...options });

export const userProfile = Joi.object()
  .keys({
    firstName: stringSchema.required(),
    lastName: stringSchema.required(),
    bio: stringSchema.required(),
    image: stringSchema.uri({
      scheme: ['http', 'https'],
    }),
  })
  .options({ ...options });

export const signupSchema = Joi.object()
  .keys({
    username: usernameSchema,
    email,
    password: Joi.string()
      .alphanum()
      .min(8)
      .required(),
  })
  .options({ ...options });

export const loginSchema = Joi.object()
  .keys({
    email,
    password: stringSchema.alphanum().required(),
  })
  .options({ ...options });

export const articleBody = Joi.object()
  .keys({
    title: stringSchema.required(),
    body: stringSchema.required(),
    description: stringSchema.required(),
    images: stringSchema.required(),
    tags: stringSchema,
  })
  .options({ ...options });

export const commentAndArticle = Joi.object()
  .keys({
    articleId: uuidSchema.required(),
    commentId: uuidSchema.required(),
  })
  .options({ ...options });

export const commentBody = Joi.object()
  .keys({
    comment: stringSchema.required(),
  })
  .options({ ...options });

export const report = Joi.object()
  .keys({
    reportType: Joi.string()
      .trim()
      .uppercase()
      .valid([
        PLAGIARISM,
        PROFANITY,
        DISCRIMINATORY,
        ADULT_CONTENT,
        TERRORISM,
        OTHER,
      ])
      .required(),
    content: stringSchema.required(),
  })
  .options({ ...options });

export const role = Joi.object()
  .keys({
    role: Joi.string()
      .trim()
      .uppercase()
      .valid([ADMIN, AUTHOR])
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

export const usernameOnly = Joi.object()
  .keys({
    username: stringSchema.alphanum().required(),
  })
  .options({ ...options });

export const keyword = Joi.object()
  .keys({
    keyword: stringSchema.required(),
  })
  .options({ ...options });
