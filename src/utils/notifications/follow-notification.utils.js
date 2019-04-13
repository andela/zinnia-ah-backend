import sendMailer from '../../config/mail-config';
import models from '../../db/models';
import { getUserbyId } from '../helpers.utils';

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
    return 'This user does not exist';
  }

  const emailBody = `Hi ${followee.username}, you have a new follower, ${
    follower.username
  } is now following you`;
  const body = {
    receivers: [`${followee.email}`],
    subject: `Notification: New Follower`,
    text: '',
    html: `<p>${emailBody}<p/> `,
  };

  await Notification.create({
    notification: body,
    userId: followee.id,
    notificationType: 'follow',
    notificationTypeId: follower.id,
  });

  try {
    return await sendMailer(body);
  } catch (e) {
    return e.message;
  }
}
