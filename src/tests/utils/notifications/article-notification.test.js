import chai from 'chai';
import newArticleNotification from '../../../utils/notifications/article-notification.utils';
import sinon from 'sinon';
import { sendMailer, transporter } from '../../../config/mail-config';
import app from '../../../server';
import slug from 'slug';
import uuidv4 from 'uuidv4';

const { expect } = chai;

const userWithFollower = {
  email: 'tinawhatsgood@ah.com',
  password: 'newtyronne',
};

const userWithoutFollower = {
  email: 'igbominadeveloper@ah.com',
  password: 'password1',
};

const createdArticle = {
  id: '141f4f05-7d81-4593-ab54-e256c1006210',
  title: 'Hello Article',
  slug: slug(`Hello Article 1-${uuidv4()}`),
};

describe('Article Notification', () => {
  let userIdWithFollower;
  let userIdWithoutFollower;
  let info;
  before(done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(userWithFollower)
      .end((err, res) => {
        userIdWithFollower = res.body.data.user.id;
      });
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(userWithoutFollower)
      .end((err, res) => {
        userIdWithoutFollower = res.body.data.user.id;
        done();
      });
  });

  it('should send an email to all the followers of the author', async () => {
    info = await newArticleNotification(userIdWithFollower, createdArticle);
    expect(info).to.eql('follower is not defined');
  });

  it('should return null if the author has no followers', async () => {
    info = await newArticleNotification(userIdWithoutFollower, createdArticle);
    expect(info).to.eql(null);
  });
});
