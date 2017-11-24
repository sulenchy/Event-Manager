// import dependencies
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../models';

/**
 * This is a UserSignup class that allows a client to signup
 * @export
 * @class UserSignup
 */
export class UserSignup {
  /**
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} JSON - this is returned to notify the user of account creation
 * @static
 * @memberof UserSignup
 */
  static signUp(req, res) {
    const {
      retypePassword,
    } = req.body;
    // const emailLowerCase = email.toLowerCase();

    let {
      email, password, username, userType,
    } = req.body;
    email = (email.toLowerCase()).trim();
    username = (username.toLowerCase()).trim();
    userType = (userType.toLowerCase()).trim();

    /* Checks password length */
    if (password.length < 8) {
      return res.status(400).send({
        status: 'Password error',
        message: 'Password must not be less than 8 or be undefined',
      });
    }
    if (password !== retypePassword) {
      return res.status(400).send({
        status: 'Password error',
        message: 'Password supplied deos not tally with retype password',
      });
    }
    /* encrypt password and stores in the database
    along with some user information */
    password = bcrypt.hashSync(password, 10);
    return Users
      .create({
        username,
        email,
        password,
        userType,
      })
      .then((user) => {
        res.status(201).send({
          status: 'Success',
          message: 'Account created successfully',
          username: user.username,
          id: user.id,
        });
      })
      .catch(err => res.status(400).send({
        status: 'Error signing up',
        message: 'This username already exist or invalid data supplied',
      }));
  }
}

/**
 * This is a UserSignin class that allows a client to signin and
 * a token is generated for the user to keep for future authentication
 * @export
 * @class UserSignin
 */
export class UserSignin {
  /**
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} JSON - this is returned to notify the user of account creation
 * @static
 * @memberof UserSignin
 */
  static signIn(req, res) {
    /* grab the username, email and password from the req.body
      these values are parsed and then if there is an error it is returned
      if
     */
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        status: 'Sign-in Error',
        message: 'Please enter your email and password',
      });
    }
    return Users // check the db if user has already signedup
      .findOne({
        where: {
          email,
        },
      })
      .then((user) => {
        if (!user) { // returns an error if user has not signedup yet
          return res.status(400).send({
            status: 'Sign-in Error',
            message: 'User not found. Sign-in with correct data or signup as a new client',
          });
        }
        if (bcrypt.compareSync(password, user.password)) {
          /*  if user has an account,
            compare password with what we have in the db.
            if password is correct, save the user id in a token
            and send this to the user for authentication.
           */
          const payload = { id: user.id, email: user.email, userType: user.userType };
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '3h',
          });
          return res.status(200).send({
            status: 'Success',
            message: 'Congratulation, you successfully signed-in into andevents',
            data: token,
          });
        }
        return res.status(400).send({
          status: 'Login Error',
          message: 'Incorrect login details supplied',
        });
      });
  }
}
