import {
  comparePassword,
  generateToken,
  errorResponse,
  verifyToken,
  successResponse,
  checkDuplicateUser,
  serverError,
  excludeProperty,
} from '../../utils/helpers.utils';
import models from '../../db/models';
import { sendMailer } from '../../config/mail-config';
import mailTemplate from '../../utils/mail-template/mail-template.utils';

const { User } = models;
/**
 * Create A User
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
export async function signup(req, res) {
  const { email, username } = req.body;
  const isDuplicate = await checkDuplicateUser(email, username);
  if (isDuplicate) {
    return errorResponse(
      res,
      409,
      'validation error',
      'Username/Email in use already',
    );
  }
  try {
    const user = await User.create(req.body);
    const tokenPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = await generateToken(tokenPayload);
    const url =
      process.env.NODE_ENV === 'development' || 'test'
        ? `${process.env.LOCAL_URL}/auth/users/confirmation/${token}`
        : `${process.env.PRODUCTION_URL}/auth/users/confirmation/${token}`;
    const body = {
      title: 'Verification Email',
      content: `Please click this <a href="${url}"> link</a> to confirm your email`,
    };

    const emailDetails = {
      receivers: [`${user.email}`],
      subject: body.title,
      text: '',
      html: mailTemplate(body),
    };
    await sendMailer(emailDetails);
    return successResponse(
      res,
      201,
      'Please check your mail to verify your account',
      {
        token,
      },
    );
  } catch (err) {
    return serverError(res, 500, message);
  }
}

/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export async function confirmUser(req, res) {
  try {
    const decoded = await verifyToken(req.params.token);
    const { id, username } = decoded;
    const response = await User.update(
      {
        isEmailVerified: true,
      },
      {
        returning: true,
        where: {
          id,
        },
      },
    );
    const responseData = {
      confirmed: response[1][0].isEmailVerified,
    };
    return res.redirect(`https://zinnia-ah-frontend-staging.herokuapp.com/`);
  } catch (err) {
    return serverError(res);
  }
}

/**
 * Redirect location after social login
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export async function socialController(req, res) {
  const { isNewRecord } = req.user._options;
  const user = req.user.dataValues;
  const { redirectUrl } = req;

  try {
    const tokenPayload = {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };

    const token = await generateToken(tokenPayload);

    const url = `${redirectUrl}?token=${token}&isNewRecord=${isNewRecord}`;

    return res.redirect(301, url);
  } catch (err) {
    return serverError(res);
  }
}

/**
 * Login a User
 * @param {object} req
 * @param {object} res
 * @returns {object} login response
 */
export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return errorResponse(res, 404, 'Not found');
    }
    if (!comparePassword(user.password, password)) {
      return errorResponse(res, 400, 'Incorrect Password');
    }
    const { id } = user;
    const token = generateToken({
      id,
      email,
    });

    const userJSON = user.toJSON();
    const authenticatedUser = excludeProperty(userJSON, ['password']);
    return successResponse(res, 200, 'You have successfully logged in', {
      authenticatedUser,
      token,
    });
  } catch (error) {
    return serverError(res);
  }
}
