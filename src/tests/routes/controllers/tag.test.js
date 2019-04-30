import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import app from '../../../server';
import { generateToken } from '../../../utils/helpers.utils';
import {
  createTag,
  updateTag,
  removeTag,
  viewTag,
} from '../../../routes/controllers/tags.controller';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

const userToken = generateToken({
  id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
  email: 'ecomje@gmail.com',
});

const articleId = '141f4f05-7d81-4593-ab54-e256c1006210';
const generatedTags = 'faker.random.words(5).ddd'.split('.');

describe('TAGS METHODS', () => {
  describe('CREATE TAGS: functions/methods', () => {
    it('should return created tags', async () => {
      const tags = await createTag(generatedTags, articleId);
      expect(tags).to.be.an('array');
    });

    it('should return invalid article id', async () => {
      const tags = await createTag(
        'faker.lorem.words(5).another'.split(' '),
        'invalid-articleId',
      );
      expect(tags).to.be.an('string');
      expect(tags).to.eql('invalid article id');
    });

    it('should return tag type', async () => {
      const tags = await createTag('tag as string', articleId);
      expect(tags).to.be.an('null');
    });
  });

  describe('UPDATE TAGS: functions/methods', () => {
    it('should return updated tags tags', async () => {
      const tags = await updateTag(
        generatedTags.filter((item, index) => index < generatedTags.length - 3),
        articleId,
      );
      expect(tags).to.be.an('array');
    });

    it('should return tag type', async () => {
      const tags = await updateTag('tag as string', articleId);
      expect(tags).to.be.an('null');
    });
  });

  describe('REMOVE TAGS: functions/methods', () => {
    it('should return removed tags', async () => {
      const tags = await removeTag(articleId);
      expect(tags.status).to.equal('deleted');
    });
  });
});
