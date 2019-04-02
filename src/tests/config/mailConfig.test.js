import chai from 'chai';
import mockery from 'mockery';
import nodemailerMock from 'nodemailer-mock';
import sendMailer from '../../config/mailConfig';

const { expect } = chai;

const receivers = ['nediicodes@gmail.com', 'nedyudombat@gmail.com'];
const body = {
  receivers,
  subject: 'Test mail',
  text: '',
  html: '<p>Test mail to verify if email configuration is working</p>'
};

describe('Mail Configuration', () => {
  before(() => {
    mockery.enable({
      warnOnUnregistered: false,
    });
    mockery.registerMock('nodemailer', nodemailerMock);
  });

  afterEach(() => {
    nodemailerMock.mock.reset();
  });

  after(() => {
    mockery.deregisterAll();
    mockery.disable();
  });

  it('should send an email to the recipient mail using nodemailer-mock', async () => {
    let info, error;
    try {
      info = await sendMailer(body);
    } catch (e) {
      error = e;
    } finally {
      expect(error).to.eql(undefined);
      expect(info.rejected).to.eql([]);
      expect(info.response).to.eql('250 2.0.0 Ok: queued');
      expect(info.envelope).to.be.a('object');
      expect(info.messageId).to.be.a('string');
    }
  });
});
