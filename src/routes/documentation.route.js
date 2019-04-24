/**
 * @swagger
 *
 * definitions:
 *   Signup:
 *     type: object
 *     required:
 *       - username
 *       - password
 *       - email
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *   Login:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *   Articles:
 *     type: object
 *     required:
 *       - title
 *       - description
 *       - body
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *         format: text
 *       body:
 *         type: string
 *         format: text
 */

/**
 * Authentication Route
 */

/**
 * @swagger
 *
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - User Signup
 *     description: User Registration Endpoint
 *     parameters:
 *       - name: username
 *         description: prefered username (8 char. min).
 *         from: token in Header
 *         in: formData
 *         required: true
 *       - name: email
 *         description: your email address.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: your password.
 *         in: formData
 *         required: true
 *     responses:
 *       201:
 *         description: User created
 *         schema:
 *           $ref: '#/definitions/Signup'
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 */

/**
 * @swagger
 *
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - User Login
 *     description: User login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: your email address.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: prefered username (uniqe to you).
 *         in: formData
 *         required: true
 *     request:
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/Signup'
 *     responses:
 *       200:
 *         description: Login successful
 *         schema:
 *           $ref: '#/definitions/Login'
 *       400:
 *         description: Bad request.
 *         schema:
 *           $ref: '#/definitions/Login'
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * @swagger
 *
 * /api/v1/auth/users/forgot-password:
 *   post:
 *     tags:
 *       - Forgot Password
 *     description: Forgot Password
 *     parameters:
 *       - name: email
 *         description: your email address.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: User created
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: Email has been sent successfully
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * @swagger
 *
 * /api/v1/auth/users/reset-password/-token:
 *   patch:
 *     tags:
 *       - Reset Password
 *     description: Reset Password
 *     parameters:
 *       - name: password
 *         description: your email address.
 *         in: formData
 *         format: password
 *         required: true
 *     responses:
 *       200:
 *         description: User created
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: Password successfully reset
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * Social Login
 */

/**
 * @swagger
 *
 * /api/v1/auth/facebook:
 *   get:
 *     tags:
 *        - Facebook Social Login
 *     description: User Registration Via Facebook
 *     produces:
 *       - application/json
 *     request:
 *         $ref: '#/definitions/auth/facebook'
 *     responses:
 *       201:
 *         description: User created
 *       200:
 *         description: Existing user is now logged in
 *       400:
 *         description: Bad request.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * ARTICLES
 */

/**
 * @swagger
 *
 * /api/v1/articles:
 *   post:
 *     tags:
 *       - Create Article
 *     description: users can create an article on authors haven.
 *     parameters:
 *       - name: title
 *         description: the title of the article.
 *         in: formData
 *         required: true
 *       - name: description
 *         description: the summary of the article.
 *         in: formData
 *         required: true
 *       - name: body
 *         description: the content of the article.
 *         in: formData
 *         format: textara
 *         required: true
 *     responses:
 *       201:
 *         description: article created
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: your article has been created successfully
 *             data:
 *              type: object
 *              properties:
 *                id:
 *                 type: string
 *                 example: a4d08d7f-e73c-4b20-84f9-e136c8ca9c91
 *                userId:
 *                 type: string
 *                 example: 38e02f74-4f25-4a55-b25c-ee4a0098f3fe
 *                slug:
 *                 type: string
 *                 example: the-man-that-lived-forever-34dvf23
 *                title:
 *                 type: string
 *                 example: the man that lived forever
 *                description:
 *                 type: string
 *                 example: there was this man who lived forever before forever came
 *                body:
 *                 type: string
 *                 example: there was this man who lived forever before forever came lorem, emmsdan i emmsdan snowclean clean snwo, lorem lorem, emmsdan i emmsdan snowclean clean snwo, lorem lorem, emmsdan i emmsdan snowclean clean snwo, lorem
 *                status:
 *                 type: string
 *                 example: PUBLISHED
 *                readTime:
 *                 type: string
 *                 example: 5
 *                createdAt:
 *                 type: string
 *                 example: 2019-04-24T09:51:42.227Z
 *                updatedAt:
 *                 type: string
 *                 example: 2019-04-24T09:51:42.227Z
 *                subscriptionType:
 *                 type: string
 *                 example: PREMIUM
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       500:
 *         description: ran
 */

/**
 * @swagger
 *
 * /api/v1/articles/-articleslug:
 *   get:
 *     tags:
 *       - Get a single article
 *     description: users can fetch a single article.
 *     produces:
 *       - application/json
 *     $ref: '#/definitions/Articles'
 *     responses:
 *       200:
 *         description: article fetched
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: Article successfully retrieved
 *             data:
 *              type: object
 *              properties:
 *                id:
 *                 type: string
 *                 example: a4d08d7f-e73c-4b20-84f9-e136c8ca9c91
 *                userId:
 *                 type: string
 *                 example: a4d08d7f-e73c-84f9-4b20-e136c8ca1422c
 *                slug:
 *                 type: string
 *                 example: the-title-article-slug-234df2
 *                title:
 *                 type: string
 *                 example: the title of the article
 *                description:
 *                 type: string
 *                 example: a short summary of this title of the article
 *                body:
 *                 type: string
 *                 example: lorem, emmsdan i emmsdan snowclean clean snwo, lorem lorem, emmsdan i emmsdan snowclean clean snwo, lorem lorem, emmsdan i emmsdan snowclean clean snwo, lorem
 *                status:
 *                 type: string
 *                 example: PUBLISHED
 *                readTime:
 *                 type: string
 *                 example: 5
 *                createdAt:
 *                 type: string
 *                 example: 2019-04-24T09:51:42.227Z
 *                updatedAt:
 *                 type: string
 *                 example: 2019-04-24T09:51:42.227Z
 *                author:
 *                 type: object
 *                 properties:
 *                  firstName:
 *                    type: string
 *                    example: jane
 *                  lastName:
 *                    type: string
 *                    example: doe
 *                  username:
 *                    type: string
 *                    example: janedoe
 *       404:
 *         description: article not found
 *       500:
 *         description: Database error
 */

/**
 * @swagger
 *
 * /api/v1/articles/-articleSlug:
 *   delete:
 *     tags:
 *       - Delete Article
 *     description: users can delete an article on authors haven.
 *     produces:
 *       - application/json
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/Articles'
 *     responses:
 *       200:
 *         description: article deleted
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: article as been deleted successfully
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       500:
 *         description: ran
 */

/**
 * Article comments
 */

/**
 * @swagger
 *
 *  /api/v1/-slug/comments:
 *   post:
 *     tags:
 *       - Comment on an Article
 *     description: Users can comment on an article
 *     parameters:
 *       - name: comment
 *         description: enter users comment
 *         in: formData
 *         type: text
 *         required: true
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/comments'
 *     responses:
 *       201:
 *         description: Comment created
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: Comment has been created
 *             createdAt:
 *              type: string
 *              example: 2019-04-24T10:14:57.216Z
 *             updatedAt:
 *              type: string
 *              example: 2019-04-24T10:14:57.216Z
 *             body:
 *              type: string
 *              example: i think what you did is bad
 *             author:
 *              type: object
 *              properties:
 *                username:
 *                 type: string
 *                 example: dimpaking
 *                email:
 *                 type: string
 *                 example: dimpaking@gmail.com
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * @swagger
 *
 * api/v1/-slug/comments/-commentId/thread:
 *   post:
 *     tags:
 *       - Reply a comment
 *     description: create threaded comment
 *     produces:
 *       - application/json
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/comments'
 *     responses:
 *       201:
 *         description: Comment created
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: You have commented under this thread
 *             data:
 *              type: object
 *              properties:
 *               threadedComment:
 *                type: object
 *                properties:
 *                 id:
 *                  type: string
 *                  example: 54f13041-391e-485f-81dc-eb7be195d89e
 *                 userId:
 *                  type: string
 *                  example: 38e02f74-4f25-4a55-b25c-ee4a0098f3fe
 *                 articleId:
 *                  type: string
 *                  example: 5c45dcb6-4c05-4b88-b980-e268e96f4d6f
 *                 body:
 *                  type: string
 *                  example: my threaded Comments
 *                 updatedAt:
 *                  type: string
 *                  example: 2019-04-24T11:02:27.223Z
 *                 createdAt:
 *                  type: string
 *                  example: 2019-04-24T11:02:27.223Z
 *                 parent_id:
 *                  type: string
 *                  example: faa0e290-7618-4769-9ffe-63599bad8d9e
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * @swagger
 *
 * /api/v1/articles/-articleId/comments/-commentId/edit:
 *   post:
 *     tags:
 *       - Edit Comment
 *     description: users can edit their comments on an article.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: editCommentBody
 *         description: the new comment
 *         in: formData
 *         required: true
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/comment'
 *     responses:
 *       200:
 *         description: You edited this comment
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: You edited this comment
 *             data:
 *              type: object
 *              properties:
 *               updatedComment:
 *                type: object
 *                properties:
 *                 id:
 *                  type: string
 *                  example: 54f13041-391e-485f-81dc-eb7be195d89e
 *                 userId:
 *                  type: string
 *                  example: 38e02f74-4f25-4a55-b25c-ee4a0098f3fe
 *                 articleId:
 *                  type: string
 *                  example: 5c45dcb6-4c05-4b88-b980-e268e96f4d6f
 *                 body:
 *                  type: string
 *                  example: my edited  Comments
 *                 updatedAt:
 *                  type: string
 *                  example: 2019-04-24T11:02:27.223Z
 *                 createdAt:
 *                  type: string
 *                  example: 2019-04-24T11:02:27.223Z
 *                 parent_id:
 *                  type: string
 *                  example: faa0e290-7618-4769-9ffe-63599bad8d9e
 *               archivedComment:
 *                type: object
 *                properties:
 *                 commentId  :
 *                  type: string
 *                  example: 54f13041-391e-485f-81dc-eb7be195d89e
 *                 userId:
 *                  type: string
 *                  example: 38e02f74-4f25-4a55-b25c-ee4a0098f3fe
 *                 archivedComment:
 *                  type: string
 *                  example: archived comments
 *                 updatedAt:
 *                  type: string
 *                  example: 2019-04-24T11:02:27.223Z
 *                 createdAt:
 *                  type: string
 *                  example: 2019-04-24T11:02:27.223Z
 *       404:
 *         description: article not found
 *       500:
 *         description: Database error
 */

/**
 * Articles Likes
 */

/**
 * @swagger
 *
 * /api/v1/articles/-articleId/like:
 *   post:
 *     tags:
 *       - Like an Article
 *     description: users can like an article.
 *     produces:
 *       - application/json
 *     $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: Article has been liked
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: Article has been liked
 *             data:
 *              type: object
 *              properties:
 *               userData:
 *                type: object
 *                properties:
 *                 id:
 *                  type: string
 *                  example: 54f13041-391e-485f-81dc-eb7be195d89e
 *                 firstName:
 *                  type: string
 *                  example: jane
 *                 lastName:
 *                  type: string
 *                  example: doe
 *                 username:
 *                  type: string
 *                  example: janedoe
 *                 email:
 *                  type: string
 *                  example: janedoe@gmail.com
 *                 bio:
 *                  type: string
 *                  example: i am a girl that  loves to code
 *                 interests:
 *                  type: array
 *                  example: ['programming', 'text']
 *                 role:
 *                  type: string
 *                  example: AUTHOR
 *                 image:
 *                  type: string
 *                  example: http://bit.ly/sdds
 *                 isEmailVerified:
 *                  type: string
 *                  example: false
 *                 updatedAt:
 *                  type: string
 *                  example: 2019-04-24T11:02:27.223Z
 *                 createdAt:
 *                  type: string
 *                  example: 2019-04-24T11:02:27.223Z
 *                 likes:
 *                  type: object
 *                  properties:
 *                     title:
 *                      type: string
 *                      example: understanding react redux
 *                     id:
 *                      type: string
 *                      example: 5c45dcb6-4c05-4b88-b980-e268e96f4d6f
 *                     slug:
 *                      type: string
 *                      example: understanding-react-redux-1s2C34nds
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       500:
 *         description: Server did not process request
 */

/**
 * @swagger
 *
 * /api/v1/articles/-articleId/unlike:
 *   post:
 *     tags:
 *       - Unlike an Article
 *     description: users can unlike an article.
 *     responses:
 *       200:
 *         description: Article has been liked
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: unlike article successful
 *             data:
 *              type: object
 *              properties:
 *               userData:
 *                type: object
 *                properties:
 *                 id:
 *                  type: string
 *                  example: 54f13041-391e-485f-81dc-eb7be195d89e
 *                 firstName:
 *                  type: string
 *                  example: jane
 *                 lastName:
 *                  type: string
 *                  example: doe
 *                 username:
 *                  type: string
 *                  example: janedoe
 *                 email:
 *                  type: string
 *                  example: janedoe@gmail.com
 *                 bio:
 *                  type: string
 *                  example: i am a girl that  loves to code
 *                 interests:
 *                  type: array
 *                  example: ['programming', 'text']
 *                 role:
 *                  type: string
 *                  example: AUTHOR
 *                 image:
 *                  type: string
 *                  example: http://bit.ly/sdds
 *                 isEmailVerified:
 *                  type: string
 *                  example: false
 *                 updatedAt:
 *                  type: string
 *                  example: 2019-04-24T11:02:27.223Z
 *                 createdAt:
 *                  type: string
 *                  example: 2019-04-24T11:02:27.223Z
 *                 likes:
 *                  type: array
 *                  example: []
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       500:
 *         description: Server did not process request
 */

/**
 * @swagger
 *
 * /api/v1/articles/-articleId/comments/-commentId/like:
 *   post:
 *     tags:
 *       - Like a Comment
 *     description: users can like a comment.
 *     responses:
 *       200:
 *         description: comments liked
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: You have liked this post
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       500:
 *         description: Server did not process request
 */

/**
 * Article Share
 */

/**
 * @swagger
 *
 * /api/v1/articles/-articleId/share:
 *   post:
 *     tags:
 *       - Share Article Via Email
 *     description: users can share a single article via email.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email to share article with.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: article fetched
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: unlike article successful
 *             data:
 *              type: object
 *              properties:
 *               article:
 *                type: object
 *                properties:
 *                 id:
 *                  type: string
 *                  example: 54f13041-391e-485f-81dc-eb7be195d89e
 *                 slug:
 *                  type: string
 *                  example: the-title-for-the-article-eb7be195d89e
 *                 title:
 *                  type: string
 *                  example: the title for the article
 *                 description:
 *                  type: string
 *                  example: articulated article
 *                 body:
 *                  type: string
 *                  example: elly children, until during the civil war, 2 of them died and after that, the third died of car crashAndrew, is the first and only surviving of his children. Stephen had 4 lovelly children, until during the civil war, 2 of them died and after that, the third died of
 *                 status:
 *                  type: string
 *                  example: PUBLISHED
 *                 updatedAt:
 *                  type: string
 *                  example: 2019-04-24T11:02:27.223Z
 *                 createdAt:
 *                  type: string
 *                  example: 2019-04-24T11:02:27.223Z
 *                 author:
 *                  type: object
 *                  properties:
 *                    id:
 *                     type: string
 *                     example: 54f13041-391e-485f-81dc-eb7be195d89e
 *                    firstName:
 *                     type: string
 *                     example: jane
 *                    lastName:
 *                     type: string
 *                     example: doe
 *                    username:
 *                     type: string
 *                     example: janedoe
 *                    email:
 *                     type: string
 *                     example: janedoe@gmail.com
 *                    bio:
 *                     type: string
 *                     example: i am a girl that  loves to code
 *                    interests:
 *                     type: array
 *                     example: ['programming', 'text']
 *                    role:
 *                     type: string
 *                     example: AUTHOR
 *                    image:
 *                     type: string
 *                     example: http://bit.ly/sdds
 *                    isEmailVerified:
 *                     type: string
 *                     example: false
 *                    updatedAt:
 *                     type: string
 *                     example: 2019-04-24T11:02:27.223Z
 *                    createdAt:
 *                     type: string
 *                     example: 2019-04-24T11:02:27.223Z
 *       404:
 *         description: article not found
 *       500:
 *         description: Database error
 */

/**
 * Report Article
 */

/**
 * @swagger
 *
 * /api/v1/articles/-articleId/report:
 *   post:
 *     tags:
 *       - Report an Article
 *     description: users can report an article.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reportType
 *         description: report type.
 *         in: formData
 *         required: true
 *       - name: content
 *         description: the summary of the report.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: article report
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: Article has been reported
 *             data:
 *              type: object
 *              properties:
 *                 id:
 *                  type: string
 *                  example: 54f13041-391e-485f-81dc-eb7be195d89e
 *                 userId:
 *                  type: string
 *                  example: 38e02f74-4f25-4a55-b25c-ee4a0098f3fe
 *                 articleId:
 *                  type: string
 *                  example: 0f4cf6b5-c87c-4f09-b28e-c1ed7651b1dd
 *                 reportType:
 *                  type: string
 *                  example: OTHER
 *                 content:
 *                  type: string
 *                  example: elly children, until during the civil war, 2 of them died and after that, the third died of car crashAndrew, is the first and only surviving of his children. Stephen had 4 lovelly children, until during the civil war, 2 of them died and after that, the third died of
 *                 updatedAt:
 *                  type: string
 *                  example: 2019-04-24T11:02:27.223Z
 *                 createdAt:
 *                  type: string
 *                  example: 2019-04-24T11:02:27.223Z
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       500:
 *         description: Server did not process request
 */

/**
 * Follow Article
 */

/**
 * @swagger
 *
 * /api/v1/profiles/-username/follow:
 *   post:
 *     tags:
 *       - Follow a User
 *     description: Follow User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User followed
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: You have successfully followed [username]
 *             data:
 *              type: object
 *              properties:
 *                 user:
 *                  type: string
 *                  example: b48e0ac9-f623-4efe-92cf-ff0c6f8a5b78
 *                 followers:
 *                  type: array
 *                  example: [{ 'id': 'b48e0ac9-f623-4efe-92cf-ff0c6f8a5b78' }]
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified username was not found.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * @swagger
 *
 * /api/v1/profiles/-username/unfollow:
 *   delete:
 *     tags:
 *       - Unfollow a User
 *     description: Unfollow User
 *     produces:
 *       - application/json
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: User un-followed
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: You have successfully unfollowed [username]
 *             data:
 *              type: object
 *              example: { user: 'dfgr3ewfdc3-34ref3-4rfd3-rec', followers: [] }
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified username was not found.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * Highlight text
 */

/**
 * @swagger
 *
 * api/v1/articles/-articleId/highlights:
 *   post:
 *     tags:
 *       - Highlight a text
 *     description: Highlight and comment text in Article
 *     parameters:
 *       - name: highlightedText
 *         description: highlighted Text
 *         in: formData
 *         required: true
 *       - name: startIndex
 *         in: formData
 *         required: true
 *       - name: stopIndex
 *         in: formData
 *         required: true
 *       - name: comment
 *         description: users thought on the highlighted text
 *     responses:
 *       200:
 *         description: Text highlighted and commented on
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: You have highlighted this text
 *             data:
 *              type: object
 *              example: { id: 'dfgr3ewfdc3-34ref3-4rfd3-rec', highlightedText: "doing it smart, hard and on the net, is work", startIndex: 23, stopIndex: 763, "comment": "these are the major setttt of math", "articleId": "5c45dcb6-4c05-4b88-b980-e268e96f4d6f" }
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: Article with ID not found.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * @swagger
 *
 * api/v1/articles/-articleId/highlights:
 *   get:
 *     tags:
 *       - Get Highlights for an article
 *     description: Get Highlights
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of highlights
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: Your highlights
 *             data:
 *              type: object
 *              example: { id: 'dfgr3ewfdc3-34ref3-4rfd3-rec', highlightedText: "doing it smart, hard and on the net, is work", startIndex: 23, stopIndex: 763, "comment": "these are the major setttt of math", "articleId": "5c45dcb6-4c05-4b88-b980-e268e96f4d6f", createdAt: '2019-04-24T12:32:21.011Z', updatedAt: '2019-04-24T12:32:21.011Z' }
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: Article with ID not found.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * @swagger
 *
 * api/v1/articles/-articleId/highlights/-highlightId:
 *   delete:
 *     tags:
 *       - Delete an Highlights from an article
 *     description: Delete Highlight
 *     responses:
 *       200:
 *         description: Highlight removed
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *              type: string
 *              example: success
 *             message:
 *              type: string
 *              example: You have succesfully removed your highlight
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: Article with ID not found.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * @swagger
 *
 * /api/v1/users/roles:
 *   get:
 *     tags:
 *       - Get roles
 *     description: Get roles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Request successful
 *         schema:
 *          type: object
 *          properties:
 *            status:
 *             type: string
 *             example: success
 *            message:
 *             type: string
 *             example: roles fetched successfully
 *            data:
 *             type: array
 *             example: [ { id: '38e02f74-4f25-4a55-b25c-ee4a0098f3fe', email: 'janedoe@gmail.com', username: 'janedoe', role: 'AUTHOR' }, { id: 'ee4a0098f3fe-4f25-4a55-b25c-38e02f74', email: 'example@gmail.com', username: 'example', role: 'ADMIN' }, ]
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       403:
 *        description: Access Forbidden.
 *        schema:
 *          type: object
 *          properties:
 *            status:
 *             type: string
 *             example: error
 *            message:
 *             type: string
 *             example: You are not allowed to perform this action because you are not an Admin
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * @swagger
 *
 * /api/v1/users/roles/:username:
 *   put:
 *     tags:
 *       - Make User Admin
 *     description: make a user an admin
 *     parameters:
 *       - name: role
 *         description: new roles [AUTHOR or ADMIN]
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Request successful
 *         schema:
 *          type: object
 *          properties:
 *            status:
 *             type: string
 *             example: success
 *            message:
 *             type: string
 *             example: role updated successfully
 *            data:
 *             type: array
 *             example: [ { id: '38e02f74-4f25-4a55-b25c-ee4a0098f3fe', firstName: 'jane', lastName: 'doe', email: 'janedoe@gmail.com', username: 'janedoe', role: 'AUTHOR', isEmailVerified: true, createdAt: '2019-04-23T12:13:16.086Z', updatedAt: '2019-04-24T12:14:06.086Z' } ]
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       403:
 *        description: Access Forbidden.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * @swagger
 *
 * /api/v1/search?keyword=jane:
 *   get:
 *     tags:
 *       - Search the site
 *     description: perform a site wide search
 *     parameters:
 *       - name: keyword
 *         description: search keywords
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: matches found
 *         schema:
 *          type: object
 *          properties:
 *            status:
 *             type: string
 *             example: success
 *            message:
 *             type: string
 *             example: matches found
 *            data:
 *             type: object
 *             example: { keyword: 'program code', article: [ { id: '3245trgfdvf-34refds-rewfds-23wwedf3', userid: '4356tyg87ytghv-nbjhuy89-98uy-98yugh', title: 'programing datas', description: 'article summery' },  { id: '3245trgfdvf-34refds-rewfds-23wwedf3', userid: '4356tyg87ytghv-nbjhuy89-98uy-98yugh', title: 'programing datas', description: 'article summery' } ], authors: [ { username: 'jonedoe', firstName: 'jone', lastName: 'doe', image: 'http://img.url/pat' }, { username: 'jonedoe', firstName: 'jone', lastName: 'doe', image: 'http://img.url/pat' }, ], tags: [ 'programming', 'codes', 'technology', 'art', 'painting'] }
 *       400:
 *         description: Bad request
 *       404:
 *        description: A user with the specified username was not found.
 *       5XX:
 *        description: Server error.
 */

/**
 * @swagger
 *
 * /api/v1/users/profiles/-username/stats:
 *   get:
 *     tags:
 *       - Users Reading Stats
 *     description: Get Reading stats for a user
 *     responses:
 *       200:
 *         description: stats fetched successfully
 *         schema:
 *          type: object
 *          properties:
 *            status:
 *             type: string
 *             example: success
 *            message:
 *             type: string
 *             example: reading stats
 *            data:
 *             type: object
 *             example: {  count: 1, rows: [ { id: '324trefgb-34ed-fgr4-345ertfdew', title: 'the articles name', slug: 'the-article-name-34erfg', description: 'the lorem, sofil asdfjd' }] }
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the username was not found.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * @swagger
 *
 * /api/v1/users/profiles/:username:
 *   get:
 *     tags:
 *       - Views a user profile
 *     description: View user's profile
 *     responses:
 *       200:
 *         description: Get profile request successful
 *         schema:
 *          type: object
 *          properties:
 *            status:
 *             type: string
 *             example: success
 *            message:
 *             type: string
 *             example: Get profile request successful
 *            data:
 *             type: object
 *             example: { "authorProfile":{"id":"34745e2c-772c-41df-916c-375958882184","firstName":"gentle","lastName":"jane","username":"gentlejane","email":"giant@gmail.com", "bio":null,"interests":null,"role":"ADMIN","image":null,"isEmailVerified":false,"createdAt":"2019-04-24T15:26:07.000Z","updatedAt":"2019-04-24T14:26:30.360Z" } }
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the username was not found.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * @swagger
 *
 * /api/v1/users/profile/update:
 *   put:
 *     tags:
 *       - Update Users Profile info
 *     description: Update User Profile Endpoint
 *     parameters:
 *       - name: firstName
 *         description: users firstname
 *         in: formData
 *       - name: lastName
 *         description: users surname
 *         in: formData
 *       - name: username
 *         description: users username
 *         in: formData
 *       - name: bio
 *         description: short bio of the users
 *         in: formData
 *       - name: image
 *         description: users profile image
 *         in: formData
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User updated
 *         schema:
 *          type: object
 *          properties:
 *            status:
 *             type: string
 *             example: success
 *            message:
 *             type: string
 *             example: Your profile has been updated succesfully
 *            data:
 *             type: object
 *             example: { "id":"ad65bbc9-1301-4852-8479-87287aba05c1","username":"loper5d6rft7gy8","email":"example@gmail.com","bio":"I am black in skin, but light in spirit","interests":null,"image":"httadad dasdasd","social_provider":null,"social_id":null,"role":"AUTHOR","firstName":"Miracle","lastName":"example","isEmailVerified":false,"createdAt":"2019-04-24T15:54:52.626Z","updatedAt":"2019-04-24T16:01:42.516Z" }
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */

/**
 * @swagger
 *
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Get all authors
 *     description: Get all authors
 *     responses:
 *       200:
 *         description: User updated
 *         schema:
 *          type: object
 *          properties:
 *            status:
 *             type: string
 *             example: success
 *            message:
 *             type: string
 *             example: success
 *            data:
 *             type: object
 *             example: {  authors: [ { "id":"ad65bbc9-1301-4852-8479-87287aba05c1","username":"loper5d6rft7gy8","email":"example@gmail.com","bio":"I am black in skin, but light in spirit","interests":null,"image":"httadad dasdasd","social_provider":null,"social_id":null,"role":"AUTHOR","firstName":"Miracle","lastName":"example","isEmailVerified":false,"createdAt":"2019-04-24T15:54:52.626Z","updatedAt":"2019-04-24T16:01:42.516Z" } ] }
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */
