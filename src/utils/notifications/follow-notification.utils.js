import { sendMailer } from '../../config/mail-config';
import models from '../../db/models';
import { getUserbyId } from '../helpers.utils';
import mailTemplate from '../../utils/mail-template/mail-template.utils';

const { Notification } = models;

/**
 * Send Notification email for new follower
 *
 * @returns {Boolean} true if email sends
 * @returns {Boolean} false if email does not send
 * @param { integer } followeeId
 * @param { integer } followerId
 */
export default async function newFollowerNotification(followeeId, followerId) {
  const followee = await getUserbyId(followeeId);
  const follower = await getUserbyId(followerId);

  if (!followee || !follower) {
    return;
  }

  const emailBody = {
    title: 'Notification: New Follower',
    content: `Hi ${followee.username}, you have a new follower, ${
      follower.username
    } is now following you`,
  };
  const body = {
    receivers: [`${followee.email}`],
    subject: emailBody.title,
    text: '',
    html: mailTemplate(emailBody),
  };

  try {
    await Notification.create({
      notification: emailBody.content,
      userId: followee.id,
      notificationType: 'follow',
      notificationTypeId: follower.id,
    });
    return await sendMailer(body);
  } catch (e) {
    return e.message;
  }
}
