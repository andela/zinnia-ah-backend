import app from '../../server';

export const setRedirectUrl = (req, res, next) => {
  let redirectUrl;

  const { redirectTo } = req.query;

  redirectTo
    ? (redirectUrl = redirectTo)
    : (redirectUrl = `${process.env.PRODUCTION_URL}/api/v1/auth`);

  app.locals.redirectUrl = redirectUrl;

  next();
};

export const getRedirectUrl = (req, res, next) => {
  const { redirectUrl } = app.locals;

  let url;

  redirectUrl ? (url = redirectUrl) : (url = '');

  req.redirectUrl = url;

  next();
};
