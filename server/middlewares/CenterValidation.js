// import checkEmail from '../helpers/checkEmail';

const message = [];
/**
 * @class ValidationHelper
 * @description Helps perform validations on user request body.
 */
class CenterValidation {
  /**
    * @description - This method validates the user request body.
    * @param {object} req - The request object to be validated.
    * @param {object} res - Th response object to be validated.
    * @param {object} next - The callback function to the next middleware.
    * @returns {object} - The error object with message.
    * @memberOf CenterValidation
    * @static
    */
  static validateAddNewCenter(req, res, next) {
    CenterValidation.validateName(req);
    CenterValidation.validateAddress(req);
    CenterValidation.validateCapacity(req);
    CenterValidation.validateFacilities(req);
    CenterValidation.sendFormattedError(req, res, next);
  }

  /**
    * @description - This method validates the user update body.
    * @param {object} req - The request object to be validated.
    * @param {object} res - Th response object to be validated.
    * @param {object} next - The callback function to the next middleware.
    * @returns {object} - The error object with message.
    * @memberOf CenterValidation
    * @static
    */
  static validateUpdateCenter(req, res, next) {
    if (req.body.fullName) {
      CenterValidation.validateName(req);
    }
    if (req.body.email) {
      CenterValidation.validateAddress(req);
    }
    if (req.body.bio) {
      CenterValidation.validateCapacity(req);
    }
    if (req.body.avatarUrl) {
      CenterValidation.validatefacilities(req,);
    }
    CenterValidation.sendFormattedError(req, res, next);
  }

  /**
    * @description - This method validates the name
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf CenterValidation
    * @static
    */
  static validateName(req) {
    req.checkBody('name', 'please enter center name').trim().exists();
  }

  /**
    * @description - This method validates the address
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf CenterValidation
    * @static
    */
   static validateAddress(req) {
    req.checkBody('address', 'please enter the address of the center').exists();
  }


  /**
    * @description - This method validates the capacity
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf CenterValidation
    * @static
    */
   static validateCapacity(req) {
    req.checkBody('capacity', 'please enter the capacity of the center').exists();
  }

  /**
    * @description - This method validates the Facilities
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf CenterValidation
    * @static
    */
   static validateFacilities(req) {
    req.checkBody('facilities', 'please enter the facilities in the center').exists();
  }


  /**
    * @description - This method sends the error in the suggested json format.
    * @param {object} req - The request object to be validated.
    * @param {object} res - Th response object.
    * @param {object} next - The callback function to the next middleware.
    * @param {number} statusCode - the status code for the error
    * @returns {object} - The error object with message.
    * @memberOf CenterValidation
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
    * @memberOf CenterValidation
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

export default CenterValidation;
