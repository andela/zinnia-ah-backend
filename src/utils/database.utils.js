import models from '../db/models';

const { ReadingStat } = models;

export const recordARead = async (articleId, user = null) => {
  let userId;

  user ? (userId = user.id) : (userId = null);

  await ReadingStat.create({ articleId, userId });
};
