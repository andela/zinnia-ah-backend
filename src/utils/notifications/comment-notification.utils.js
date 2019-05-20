import { sendMailer } from '../../config/mail-config';
import models from '../../db/models';
import { getUserbyId, getArticlebyId } from '../helpers.utils';
import mailTemplate from '../mail-template/mail-template.utils';

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
  const author = article.author;

  if (!user || !author) {
    return;
  }
  const emailBody = {
    title: 'Notification: New Comment',
    content: `${user.username} commented on your article ${article.title}`,
  };

  const body = {
    receivers: [`${author.email}`],
    subject: emailBody.title,
    text: '',
    html: mailTemplate(emailBody),
  };

  try {
    await Notification.create({
      notification: emailBody.content,
      userId: author.id,
      notificationType: 'comment',
      notificationTypeId: articleId,
    });
    return await sendMailer(body);
  } catch (e) {
    return e.message;
  }
}
