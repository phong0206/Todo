/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API management methods for todos
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title
 *         description:
 *           type: string
 *           format: description
 *           description: description
 *         status:
 *           type: string
 *           description: status of the todo
 *           example: "pending"
 *       required:
 *         - status
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
 * /todo/add-todo:
 *   post:
 *     summary: add a todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *
 *     responses:
 *       200:
 *         description: add todo successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Validation Failed
 *       500:
 *         description: Error server
 */
