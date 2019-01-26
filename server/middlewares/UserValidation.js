// import checkEmail from '../helpers/checkEmail';

const message = [];
/**
 * @class ValidationHelper
 * @description Helps perform validations on user request body.
 */
class UserValidation {
  /**
    * @description - This method checks if a user enters an email.
    * @param {object} req - The request object bearing the email.
    * @param {object} res - The response object sent to the next middleware.
    * @param {object} next - The callback function to the next middleware.
    * @returns {object} - The error object with message.
    * @memberOf UserValidation
    * @static
    */
  static validateUserSignIn(req, res, next) {
    UserValidation.validateEmail(req);
    UserValidation.validatePassword(req);
    UserValidation.sendFormattedError(req, res, next);
  }

  /**
    * @description - This method validates the user request body.
    * @param {object} req - The request object to be validated.
    * @param {object} res - Th response object to be validated.
    * @param {object} next - The callback function to the next middleware.
    * @returns {object} - The error object with message.
    * @memberOf UserValidation
    * @static
    */
  static validateUserSignUp(req, res, next) {
    UserValidation.validateUsername(req);
    UserValidation.validateUserType(req);
    UserValidation.validateRetypePassword(req);
    UserValidation.validatePassword(req);
    UserValidation.validateEmail(req);
    UserValidation.sendFormattedError(req, res, next);
  }

  /**
    * @description - This method validates the user update body.
    * @param {object} req - The request object to be validated.
    * @param {object} res - Th response object to be validated.
    * @param {object} next - The callback function to the next middleware.
    * @returns {object} - The error object with message.
    * @memberOf UserValidation
    * @static
    */
  static validateUserUpdate(req, res, next) {
    if (req.body.fullName) {
      UserValidation.validateFullName(req);
    }
    if (req.body.email) {
      UserValidation.validateEmail(req);
    }
    if (req.body.bio) {
      UserValidation.validateBio(req);
    }
    if (req.body.avatarUrl) {
      UserValidation.validateUrl(req, 'avatarUrl');
    }
    if (req.body.facebookUrl) {
      UserValidation.validateUrl(req, 'facebookUrl');
    }
    if (req.body.twitterUrl) {
      UserValidation.validateUrl(req, 'twitterUrl');
    }
    if (req.body.location) {
      UserValidation.validateLocation(req);
    }
    UserValidation.sendFormattedError(req, res, next);
  }

  /**
    * @description - This method validates the email
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf UserValidation
    * @static
    */
  static validateEmail(req) {
    req.checkBody('email', 'please enter email').normalizeEmail().trim().exists();
    req.checkBody('email', 'please enter a valid email').isEmail();
  }

  /**
    * @description - This method validates the username
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf UserValidation
    * @static
    */
   static validateUsername(req) {
    req.checkBody('username', 'please enter username').exists();
    req.checkBody('username', 'The lenght of username should be between 2 to 15 character').isLength({ min: 2, max: 15 });
  }

   /**
    * @description - This method validates the retype password
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf UserValidation
    * @static
    */
    static validateRetypePassword(req) {
        req.checkBody('retypePassword', 'Passwords do not match').equals(req.body.password);
    }
  /**
    * @description - This method validates the password
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf UserValidation
    * @static
    */
   static validatePassword(req) {
    req.checkBody('password', 'please enter password').exists();
    req.checkBody('password', 'The lenght of password should be at least 8 characters').isLength({ min: 8 })
  }

  /**
    * @description - This method validates the usertype
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf UserValidation
    * @static
    */
   static validateUserType(req) {
    req.checkBody('userType', 'Usertype can either be admin or client').trim().optional().isIn(['admin', 'client']);
  }

  /**
    * @description - This method sends the error in the suggested json format.
    * @param {object} req - The request object to be validated.
    * @param {object} res - Th response object.
    * @param {object} next - The callback function to the next middleware.
    * @param {number} statusCode - the status code for the error
    * @returns {object} - The error object with message.
    * @memberOf UserValidation
    * @static
    */
  static sendFormattedError(req, res, next, statusCode) {
    const newErrors = req.validationErrors();
    const errors = {};
    if (message.length) {
      errors.fullName = [];
      errors.fullName.push(...message);
    }
    if (newErrors) {
      newErrors.forEach((x) => {
        errors[`${x.param}`] = [];
      });
      newErrors.forEach((err) => {
        if (errors[`${err.param}`]) { errors[`${err.param}`].push(err.msg); }
      });
    }
    if (newErrors || message.length) {
      return res.status(statusCode || 422).json({ status: 'Failure',errors });
    }
    if (!newErrors && !message.length) return next();
  }

  /**
    * @description - This method checks if an email is already in the system.
    * @param {object} req - The request object bearing the email.
    * @param {object} res - The response object sent to the next middleware.
    * @param {object} next - The callback function to the next middleware.
    * @returns {object} - The error object with message.
    * @memberOf UserValidation
    * @static
    */
//   static checkExistingEmail(req, res, next) {
//     const { email } = req.body;
//     checkEmail(email)
//       .then((emailFound) => {
//         if (!emailFound) return next();
//         if (emailFound) {
//           return res.status(409).json({
//             errors: {
//               email: ['email is already in use']
//             }
//           });
//         }
//       })
//       .catch(err => res.status(500).json({
//         error: {
//           message: ['error reading user table', `${err}`]
//         }
//       }));
//   }
}

export default UserValidation;
