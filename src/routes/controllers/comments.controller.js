import { errorResponse, successResponse } from '../../utils/helpers.utils';

import models from '../../db/models';

<<<<<<< HEAD
const { Comment, User, Article } = models;

export const createComment = async (req, res) => {
  const { id } = req.user;
  const { articleId } = req.params;
  const { comment } = req.body;

  try {
    const checkIfArticleExists = await Article.findByPk(articleId);
    if (!checkIfArticleExists) {
      return errorResponse(res, 404, 'This article does not exist');
    }
    const getUser = await User.findByPk(id);
    if (!getUser) {
      return errorResponse(res, 404, 'User does not exist');
    }

    const newComment = await Comment.create({
      userId: id,
      articleId,
      body: comment,
    });

    const { createdAt, updatedAt } = newComment;
    const { username, email } = getUser;
    const responseData = {
      comment: {
        id: newComment.id,
        createdAt,
        updatedAt,
        body: comment,
        author: {
          username,
          email,
        },
      },
    };
    return successResponse(res, 201, 'Comment has been created', responseData);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

export const createThreadedComment = async (req, res) => {
  const { threadedComment } = req.body;
  const { articleId, commentId } = req.params;
  const { id } = req.user;

  try {
    const checkIfArticleExists = await Article.findByPk(articleId);
    if (!checkIfArticleExists) {
      return errorResponse(res, 404, 'This article does not exist');
    }
    const checkIfCommentExists = await Comment.findByPk(commentId);
    if (!checkIfCommentExists) {
      return errorResponse(res, 404, 'This comment does not exist');
    }

    const newThreadedComment = await Comment.create({
      userId: id,
      articleId,
      body: threadedComment,
      parentId: commentId,
    });

    const response = {
      threadedComment: newThreadedComment,
    };
    return successResponse(res, 201, 'You have commented under this thread', [
      response,
    ]);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};
=======
const {
  // Comment,
  // User,
  // Article,
  CommentLike,
} = models;

export const likeComment = async (req, res) => {
  const { commentId } = req.params;
  const { id } = req.user;

  try {
    const likedComment = await CommentLike.findOne({
      where: {
        userId: id,
        commentId,
      },
    });

    if (likedComment !== null) {
      await CommentLike.destroy({
        where: {
          userId: id,
          commentId,
        },
      });
      return successResponse(res, 200, 'You have unliked this post');
    }

    await CommentLike.create({
      userId: id,
      commentId,
    });
    return successResponse(res, 200, 'You have liked this post');
  } catch (err) {
    errorResponse(res, 500, err);
  }
};

export const LikeThreadedComment = async (req, res) => {};
>>>>>>> [Feature 164797164] Added like comment functionality
