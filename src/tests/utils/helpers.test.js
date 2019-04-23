import chai from 'chai';
import chaiHttp from 'chai-http';

import {
  generateToken,
  getUserbyEmail,
  getUserbyUsername,
  getUserbyId,
  getArticlebyId,
  getArticlebySlug,
} from '../../utils/helpers.utils';

chai.use(chaiHttp);
const { expect } = chai;

describe('Helper module', () => {
  context('Generate token', () => {
    it('should generate a token', () => {
      const result = generateToken({ id: 22 });
      expect(result).to.be.a('String');
    });
  });

  context('Fetch User', () => {
    it('should fetch a user by email', async () => {
      const email = 'igbominadeveloper@ah.com';
      const result = await getUserbyEmail(email);
      expect(result).to.be.a('object');
      expect(result.email).to.be.eql(email);
    });

    it('should fetch a user by username', async () => {
      const username = 'igbominadeveloper';
      const result = await getUserbyUsername(username);
      expect(result).to.be.a('object');
      expect(result.username).to.be.eql(username);
    });

    it('should fetch a user by id', async () => {
      const id = '5a6fab9c-5849-4be5-973c-5a371165cd57';
      const result = await getUserbyId(id);
      expect(result).to.be.a('object');
      expect(result.id).to.be.eql(id);
    });
  });

  context('Fetch Article', () => {
    it('should fetch an article by id', async () => {
      const id = '141f4f05-7d81-4593-ab54-e256c1006210';
      const result = await getArticlebyId(id);
      expect(result).to.be.a('object');
      expect(result.id).to.be.eql(id);
    });

    it('should fetch an article by slug', async () => {
      const slug = 'Hello-Article-5-3b8ab5fa-c594-4d5a-be6c-0b56888bb299';
      const result = await getArticlebySlug(slug);
      expect(result).to.be.a('object');
      expect(result.slug).to.be.eql(slug);
    });
  });
});
