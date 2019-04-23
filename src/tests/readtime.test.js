import chai from 'chai';
import faker from 'faker';

import {
  wordCount,
  calcTextTime,
  calcVideoTime,
  calcImageTime,
  calculateTimeToReadArticle,
} from '../../src/utils/readtime.utils.js';

const { expect } = chai;

describe('READ TIME FUNCTIONS', () => {
  it('should count the number of words, without including spaces', () => {
    const words = wordCount(faker.lorem.words(30));
    expect(words).to.eql(30);
  });

  it('should return time it takes to read text in seconds', () => {
    const words = wordCount(faker.lorem.words(2030));
    const textTime = calcTextTime(words);
    expect(textTime).to.eql(459);
  });

  it('should return 0 if number of words passed argument is not an integer', () => {
    const textTime = calcTextTime('words');
    expect(textTime).to.eql(0);
  });

  it('should return time it takes to read images in seconds', () => {
    const images = [];
    for (let i = 0; i < 10; i++) {
      images.push(faker.image.imageUrl());
    }
    const imageTime = calcImageTime(images);
    expect(imageTime).to.be.a('number');
  });

  it('should return time it takes to view videos in seconds', () => {
    const vTimeStamps = [];
    for (let i = 0; i < 5; i++) {
      vTimeStamps.push(faker.random.number());
    }
    const videoTime = calcVideoTime(vTimeStamps);
    expect(videoTime).to.be.a('number');
  });

  it('should calculate the time it takes to read a complete article of text, video and image in minutes', () => {
    const videos = [];
    const images = [];
    for (let i = 0; i < 5; i++) {
      videos.push(i * 10);
      images.push(faker.image.imageUrl());
    }
    const words = faker.lorem.words(9656);
    const timeToRead = calculateTimeToReadArticle({
      images,
      words,
      videos,
    });
    expect(timeToRead).to.be.a('number');
  });
});
