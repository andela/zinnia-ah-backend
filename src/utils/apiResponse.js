/**
 * Global helper for a failed API request that
 * returns ereor codes prefixed with 4**
 *
 * @param {Object} response Express HTTP response Object
 * @param {Object} statusCode API response code
 * @param {Object} errorMessage any message for the user
 * @returns {Object} failed API response
 */
export const errorResponse = (response, statusCode, errorMessage) => response
  .status(statusCode).json({
    status: statusCode,
    errors: [errorMessage],
  });

/**
 * Global helper for a successful API request
 * that returns codes between 200-209
 *
 * @param {Object} response Express HTTP response Object
 * @param {Object} statusCode API response code
 * @param {Object} successMessage any message for the user
 * @param {Object} data any data response for the user
 * @returns {Object} success API response
 */
export const successResponse = (response, statusCode, successMessage, data) => response
  .status(statusCode)
  .json({
    status: statusCode,
    message: successMessage,
    data,
  });
