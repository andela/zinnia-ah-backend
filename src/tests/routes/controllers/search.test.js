import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../server';

chai.use(chaiHttp);
const { expect } = chai;
const searchUrl = '/api/v1/search';

describe('Custom search', () => {
  it('returns a 400 response when user sends an empty keyword', async () => {
    const { status, body } = await chai
      .request(app)
      .get(searchUrl)
      .query({ keyword: '' });

    expect(status).to.eql(400);
    expect(body.status).to.be.eql('error');
    expect(body).to.have.keys('status', 'message');
    expect(body.message).to.eql('Please input a search parameter');
  });

  it('returns matching results from authors table for an author name input', async () => {
    const keyword = 'igbominadeveloper';

    const { status, body } = await chai
      .request(app)
      .get(searchUrl)
      .query({ keyword });

    expect(status).to.be.eql(200);
    expect(body.status).to.be.eql('success');
    expect(body).to.have.keys('status', 'message', 'data');
    expect(body.data.keyword).be.eql(keyword);
    expect(body.data.authors).be.an('array');
    expect(body.data.authors.length).to.be.greaterThan(0);
  });

  it('returns matching results from the articles table for an article title input', async () => {
    const keyword = 'messi';

    const { status, body } = await chai
      .request(app)
      .get(searchUrl)
      .query({ keyword });

    expect(status).to.be.eql(200);
    expect(body.status).to.be.eql('success');
    expect(body).to.have.keys('status', 'message', 'data');
    expect(body.data.keyword).be.eql(keyword);
    expect(body.data.articles).be.an('array');
    expect(body.data.articles.length).to.be.greaterThan(0);
  });

  it('returns an empty array for an unmatched search result', async () => {
    const keyword = 'Nigeria';

    const { status, body } = await chai
      .request(app)
      .get(searchUrl)
      .query({ keyword });

    expect(status).to.be.eql(200);
    expect(body.status).to.be.eql('success');
    expect(body).to.have.keys('status', 'message', 'data');
    expect(body.data.keyword).be.eql(keyword);
    expect(body.data.articles.length).to.be.eql(0);
    expect(body.data.authors.length).to.be.eql(0);
  });
});
