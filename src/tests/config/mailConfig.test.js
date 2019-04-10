import chai from 'chai';
import sinon from 'sinon';
import { sendMailer, transporter } from '../../config/mailConfig';

const { expect } = chai;

let info, error;
const receivers = ['nedyudombat@gmail.com'];
const body = {
  receivers,
  subject: 'Test mail',
  text: '',
  html: '<p>Test mail to verify if email configuration is working</p>',
};

const emailSuccessResponse = {
  rejected: [],
  response: '250 2.0.0 Ok: queued',
  envelope: {
    from: 'email@gmail.com',
    to: ['jsmith@gmail.com'],
  },
  messageId: '<213456789-9876-876-234-23456765434567654@gmail.com>',
};

const missingEmailErrorResponse = {
  message: 'No recipients defined',
};

const noRequestEmailErrorResponse = {
  message: 'noBody is not defined',
};

let mockSendMail;

describe('Mail Configuration', () => {
  before(() => {
    mockSendMail = sinon.stub(transporter, 'sendMail');
  });

  after(() => {
    mockSendMail.restore();
  });
  it('should send an email to the recipient mail using nodemailer-mock', async () => {
    mockSendMail.returns(Promise.resolve(emailSuccessResponse));
    try {
      info = await sendMailer(body);
    } catch (e) {
      error = e;
    } finally {
      expect(info.rejected).to.eql([]);
      expect(info.response).to.eql('250 2.0.0 Ok: queued');
      expect(info.envelope).to.be.a('object');
      expect(info.messageId).to.be.a('string');
    }
  });

  it('should fail to send an email if there is no recipient mail', async () => {
    mockSendMail.returns(Promise.reject(missingEmailErrorResponse));
    body.receivers = [];
    try {
      info = await sendMailer(body);
    } catch (e) {
      error = e;
    } finally {
      expect(error.message).eql('No recipients defined');
    }
  });

  it('should fail to send an email if there is no object passed to the sendMail function', async () => {
    mockSendMail.returns(Promise.reject(noRequestEmailErrorResponse));
    try {
      // eslint-disable-next-line no-undef
      info = await sendMailer(noBody);
    } catch (e) {
      error = e;
    } finally {
      expect(error.message).to.eql('noBody is not defined');
    }
  });
});
