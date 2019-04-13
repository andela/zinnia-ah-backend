import sendMailer from '../../config/mail-config';
import models from '../../db/models';
import { getUserbyId, getArticlebyId } from '../helpers.utils';

const { Notification } = models;

/**
 * Send Notification email for new follower
 *
 * @returns {Boolean} true if email sends
 * @returns {Boolean} false if email does not send
 * @param { integer } articleId
 * @param { integer } userId
 */
export default async function newCommentNotification(articleId, userId) {
  const user = await getUserbyId(userId);
  const article = await getArticlebyId(articleId);
  const writer = article.user;

  if (!user || !writer) {
    return null;
  }
  const emailBody = `${user.username} commented on your article ${
    article.title
  }`;

  const body = {
    receivers: [`${writer.email}`],
    subject: `Notification: New Comment`,
    text: '',
    html: `<p>${emailBody}<p/> `,
  };

  await Notification.create({
    notification: body,
    userId: writer.id,
    notificationType: 'comment',
    notificationTypeId: articleId,
  });

  try {
    return await sendMailer(body);
  } catch (e) {
    return e.message;
  }
}
