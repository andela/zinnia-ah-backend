import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

/**
 * @description counts the number of words in a string.
 * excluding spaces, tab and newlines
 * @param {string} words
 * @returns {number} number of words
 */
export function wordCount(words) {
  return Math.floor(words.split(/[^\s]+/).length - 1);
}

/**
 * @description calculate the time to view images in an article
 * @param {array} images
 * @returns {number} time in seconds for all images
 */
export function calcImageTime(images) {
  let averageSeconds = 11;
  let totalSeconds = 0;
  images.forEach(() => {
    totalSeconds += averageSeconds;
    if (averageSeconds > 3) {
      averageSeconds -= 3;
    }
  });
  return totalSeconds;
}

/**
 * @description calculate the total average time to read videos
 * @param {array} durationsArray list the various video durations ['1023', '23023']
 * @returns {number} minutes to view all videos
 */
export function calcVideoTime(durationsArray) {
  let totalDuration = 0;
  for (let duration of durationsArray) {
    totalDuration += duration;
  }
  return totalDuration;
}

/**
 * @description calculate the total average time to read only text based article
 * @param {number} numberOfWords
 * @returns {number} minutes to read article
 */
export function calcTextTime(numberOfWords) {
  if (!Number(numberOfWords)) return 0;
  const averageReaderSpeed = 265;
  const standardMinute = 60;
  return Math.floor((numberOfWords / averageReaderSpeed) * standardMinute);
}

/**
 * @description calculate the total number of time to read a given article
 * @param {object} content
 * @returns {string} minutes to read article
 */
export function calculateTimeToReadArticle(content) {
  const imageTime = calcImageTime(content.images);
  const videoTime = calcVideoTime(content.videos);
  const numberOfWords = wordCount(content.words);
  const textTime = calcTextTime(numberOfWords);
  const seconds = imageTime + videoTime + textTime;
  return Number(moment.duration(seconds, 'seconds').format('m'));
}
