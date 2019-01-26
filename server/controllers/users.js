// import dependencies
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models';


const users = models.Users
/**
 * This is a UserSignup class that allows a client to signup
 * @export
 * @class UserSignup
 */
export default class Users {
  /**
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} JSON - this is returned to notify the user of account creation
 * @static
 * @memberof Users
 */
  static async signUp(req, res, next) {
    let {
      email, password, username, userType,
    } = req.body;
    // email = req.body.email
    username = username.toLowerCase();
    // userType = req.body.userType;
    // password = req.body.password;

    password = bcrypt.hashSync(password, 10);

    let user;
    try{
      user = await users.create({
        username,
        email,
        password,
        userType,
      })
    }
    catch(err){
      next(err);
    }
    
    if (user){
        const payload = { id: user.id, email: user.email, userType: user.userType };
        const token = jwt.sign(payload, process.env.SECRET,{expiresIn: '3h'});
        return res.status(201).send({
          status: 'Success',
          message: 'Account created successfully',
          token: token,
          user
        });
      }
  }

  /**
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} JSON - this is returned to notify the user of account creation
 * @static
 * @memberof Users
 */
  static async signIn(req, res, next) {
    let { email, password } = req.body;

    let user;
    
    try {
      user = await users.findOne({
          where: {
            email,
          },
        })
    }
    catch (err) {
      next(err);
    }

    if (!user) { // returns an error if user has not signedup yet
      return res.status(404).send({
        status: 'Failure',
        message: 'Sorry, user not found ...',
      });
    }

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const payload = { id: user.id, email: user.email, userType: user.userType };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '3h' });
        return res.status(200).send({
          status: 'Success',
          message: 'Congratulation, you successfully signed-in into andevents',
          token: token,
          user
        });
      }
      return res.status(400).send({
        status: 'Failure',
        message: 'Sorry, email or password is incorrect',
      });
    }
  }
}