import { Op } from 'sequelize';

import models from '../db/models';

const { Article, User, Tag } = models;

const articleAttributes = [
  'title',
  'description',
  'body',
  'status',
  'readTime',
];

const userAttributes = ['username', 'firstName', 'lastName', 'image'];

const tagAttributes = ['name'];

export const articleFilter = async keyword => {
  return await Article.findAll({
    attributes: articleAttributes,
    where: {
      title: {
        [Op.iLike]: `%${keyword}%`,
      },
    },
  });
};

export const authorsFilter = async keyword => {
  return await User.findAll({
    attributes: userAttributes,
    where: {
      [Op.or]: [
        {
          firstName: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          lastName: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          username: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      ],
    },
  });
};

export const tagsFilter = async keyword => {
  return await Tag.findAll({
    attributes: tagAttributes,
    where: {
      name: {
        [Op.iLike]: `%${keyword}%`,
      },
    },
  });
};
