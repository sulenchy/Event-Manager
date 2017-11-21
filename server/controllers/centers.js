// import dependencies
import { Centers, Users } from '../models';

/**
 * This is a AddNewCenter class that allows a client to signup
 * @export
 * @class AddNewCenter
 */
export class AddNewCenter {
  /**
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} JSON - this is returned to notify the user of center creation
 * @static
 * @memberof AddNewCenter
 */
  static addNew(req, res) {
    /** Get the user type */
    const userType = req.decoded.userType;
    if (userType !== 'admin') {
      console.log('userType: ', userType);
      return res.status(401).send({
        status: 'Authority Error',
        message: 'Sorry, you do not have the required previledge to the resource',
      });
    }
    const {
      name, address, capacity, cost, facilities, image,
    } = req.body;
    const userId = req.decoded.id;
    return Centers
      .create({
        name,
        address,
        capacity,
        cost,
        facilities,
        image,
        userId,
      })
      .then((center) => {
        res.status(201).send({
          status: 'Success',
          message: 'Center added successfully',
          username: center.name,
          id: center.id,
        });
      })
      .catch(err => res.status(400).send({
        status: err.message,
        message: 'This center name already exist or invalid data supplied',
      }));
  }
}

/**
* This is a AddNewCenter class that allows a client to signup
* @export
* @class GetCenterList
*/
export class GetCenterList {

}