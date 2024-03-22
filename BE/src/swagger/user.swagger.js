/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API management methods for users
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email
 *         password:
 *           type: string
 *           format: password
 *           description: password
 *         name:
 *           type: string
 *           description: name of the user
 *           example: "phonguser"
 *         phonenumber:
 *           type: string
 *           description: Phone number of the user
 *           example: 0326603593
 *         age:
 *           type: number
 *           description: age of the user
 *           example: 20
 *         isAdmin:
 *           type: boolean
 *           example: false
 *       required:
 *         - email
 */


/**
 * @swagger
 * /user/auth/register:
 *   post:
 *     summary: Register a user with the specified email and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *
 *     responses:
 *       200:
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation Failed
 *       500:
 *         description: Error server
 */
/**
 * @swagger
 * /user/auth/login:
 *   post:
 *     summary: Login a user with the specified email and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *
 *     responses:
 *       200:
 *         description: User login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation Failed
 *       500:
 *         description: Error server
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 *
 * /user/auth/profile:
 *   get:
 *     summary: get profile user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: authentication error
 *       500:
 *         description: server error
 */



/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 * /user/auth/delete/{id}:
 *   delete:
 *     summary: delete user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: userID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: delete user successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: authorization error
 *       500:
 *         description: server error
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []
 * /user/auth/update:
 *   put:
 *     summary: update  user by ID
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: userID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: authorization error
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /user/auth/logout:
 *   post:
 *     summary: Logout user from server 
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error server
 */
/**
 * Đặt tất cả thông tin Swagger tương ứng với từng route vào đây.
 * Mỗi định nghĩa swagger cho mỗi endpoint ở đây sẽ tương ứng với các endpoint trong file user.routes.js
 */
