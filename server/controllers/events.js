// import dependencies
import { Events, Users } from '../models';

/**
 * This is a AddNewCenter class that allows a client to signup
 * @export
 * @class AddNewCenter
 */
export class AddNewEvent {
  /**
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} JSON - this is returned to notify the user of event creation
 * @static
 * @memberof AddNewEvent
 */
  static addNew(req, res) {
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