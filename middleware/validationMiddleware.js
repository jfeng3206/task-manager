import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError, } from '../errors/customErrors.js';
import pool from '../config/db.js'; 
 const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        // if (errorMessages[0].startsWith('no job')) {
        //   throw new NotFoundError(errorMessages);
        // }
        // if (errorMessages[0].startsWith('not authorized')) {
        //   throw new UnauthorizedError('not authorized to access this route');
        // }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateTaskInput = withValidationErrors([
  
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 255 }).withMessage('Title must be less than 255 characters'),

  body('description')
    .optional()
    .isString().withMessage('Description must be text'),
  
    body('isComplete')
      .optional()
      .isBoolean().withMessage('isComplete must be a boolean value'),
]);

export const validateUserIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const id = parseInt(value);
    if (isNaN(id) || id <= 0) throw new NotFoundError('Invalid user ID');
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) throw new NotFoundError(`No user with id: ${value}`);
    req.user = result.rows[0];
  }),
]);

export const validateTaskIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const id = parseInt(value);
    if (isNaN(id) || id <= 0) throw new NotFoundError('Invalid task ID');
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (result.rows.length === 0) throw new NotFoundError(`No task with id: ${value}`);
    req.task = result.rows[0];
  }),
]);

export const validateRegisterInput =withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length > 0) {
        throw new BadRequestError('email already exists');
      }
      return true;
    }),
    body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long')
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
    body('password')
    .notEmpty()
    .withMessage('password is required'),
]);

// export const validateUpdateUserInput = withValidationErrors([
//   body('name').notEmpty().withMessage('name is required'),
//   body('email')
//     .notEmpty()
//     .withMessage('email is required')
//     .isEmail()
//     .withMessage('invalid email format')
//     .custom(async (email, { req }) => {
//       const user = await User.findOne({ email });
//       if (user && user._id.toString() !== req.user.userId) {
//         throw new Error('email already exists');
//       }
//     }),
//   body('lastName').notEmpty().withMessage('last name is required'),
//   body('location').notEmpty().withMessage('location is required'),
// ]);