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

    let {
      email, password, username, userType, retypePassword,
    } = req.body;

    email = req.body.email.toString().toLowerCase().trim();
    username = req.body.username.toString().toLowerCase().trim();
    userType = req.body.userType === undefined ? 'client' : req.body.userType.toString().toLowerCase().trim();
    retypePassword = req.body.retypePassword;
    password = req.body.password.toString();

    /* Checks password length */
    if (password.length < 8) {
      return res.status(400).send({
        status: 'Error signing up',
        message: 'Password must not be less than 8 character',
      });
    }
    
    // compare the password and the retype password
    if (password !== retypePassword) {
      return res.status(400).send({
        status: 'Error signing up',
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
        const payload = { id: user.id, email: user.email, userType: user.userType };
        const token = jwt.sign(payload, process.env.SECRET,{expiresIn: '3h'});
        res.status(201).send({
          status: 'Success',
          message: 'Account created successfully',
          token: token,
          user
        });
      })
      .catch(err => res.status(400).send({
        status: `Error signing up`,
        message: err.message,
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
    let { email, password } = req.body;
    email = req.body.email.toString().toLowerCase().trim();

    if (!email || !password) {
      return res.status(400).send({
        status: 'Error signing in',
        message: 'Sorry, email or password cannot be empty',
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
            status: 'Error signing in',
            message: 'Sorry, user not found ...',
          });
        }
        if (bcrypt.compareSync(password, user.password)) {
          /*  if user has an account,
            compare password with what we have in the db.
            if password is correct, save the user id in a token
            and send this to the user for authentication.
           */
          const payload = { id: user.id, email: user.email, userType: user.userType };
          const token = jwt.sign(payload, process.env.SECRET,{expiresIn:'3h'});
          return res.status(200).send({
            status: 'Success',
            message: 'Congratulation, you successfully signed-in into andevents',
            token: token,
            user
          });
        }
        return res.status(400).send({
          status: 'Error signing in',
          message: 'Sorry, email or password is incorrect',
        });
      })
      .catch(err => res.status(400).send({
        status: `Error signing up`,
        message: err.message,
      }));
  }
}
