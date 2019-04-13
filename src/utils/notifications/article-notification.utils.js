import sendMailer from '../../config/mail-config';
import models from '../../db/models';
import { getUserbyId } from '../helpers.utils';

const { Notification } = models;

/**
 * Send Notification email for new follower
 *
 * @param {integer }userId
 * @param {object} article
 * @returns {Boolean} true if email sends
 * @returns {Boolean} false if email does not send
 */
export default async function newArticleNotification(userId, article) {
  const user = await getUserbyId(userId);

  const followers = await user.getFollowers({
    attributes: ['id', 'username', 'email'],
    where: { subscribedForNotification: true },
  });

  if (followers.length === 0) {
    return null;
  }
  const articleUrl =
    process.env.NODE_ENV === 'development' || 'test'
      ? `${process.env.LOCAL_URL}/article/${article.slug}`
      : `${process.env.PRODUCTION_URL}/article/${article.slug}`;

  const emailBody = `${user.username}, has posted a new article ${
    article.title
  }, Read it here ${articleUrl}`;

  followers.forEach(async follower => {
    const body = {
      receivers: [`${follower.email}`],
      subject: `Notification: New Article`,
      text: '',
      html: `<p>${emailBody}<p/> `,
    };

    await Notification.create({
      notification: body,
      userId: follower.id,
      notificationType: 'article',
      notificationTypeId: article.id,
    });

    try {
      return await sendMailer(body);
    } catch (e) {
      return e.message;
    }
  });
}
