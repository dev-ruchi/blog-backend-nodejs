import { body }  from 'express-validator';

export default [
  // Validate 'name'
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),

  // Validate 'email'
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address'),

  // Validate 'password'
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  // Optional 'profilePicture'
//   body('profilePicture')
//     .optional()
//     .isURL().withMessage('Profile picture must be a valid URL'),

//   // Validate 'role'
//   body('role')
//     .optional()
//     .isIn(['user', 'admin']).withMessage('Role must be either "user" or "admin"'),
];


