import chai from 'chai';
import chaiHttp from 'chai-http';

import { generateToken, calcAverageRating } from '../../utils/helpers.utils';

chai.use(chaiHttp);
const { expect } = chai;

describe('Helper module', () => {
  context('Generate token', () => {
    it('should generate a token', () => {
      const result = generateToken({ id: 22 });
      expect(result).to.be.a('String');
    });
  });

  context('Calculate average', () => {
    it('should calculate the average rating', () => {
      const numberArray = [
        { rating: 2, extra: 4, colour: 5, engage: 2, toppings: 1 },
        { toppings: 4, rating: 6 },
      ];
      const result = calcAverageRating(numberArray);
      expect(result).to.eql(4);
    });
  });
});
