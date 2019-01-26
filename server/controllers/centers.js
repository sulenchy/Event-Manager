// import dependencies
import models from '../models';


const { Centers, Events } = models;
/**
 * This is a AddNewCenter class that allows a admin to add new center
 * @export
 * @class AddNewCenter
 */
export default class Center {
  /**
   * @param {object} req - The request object from the client
   * @param {object} res - The response object to the client
   * @return {object} JSON - this is returned to notify the user of center creation
   * @static
   * @memberof Center
   */
  static async addNew(req, res, next) {

    const {
      name, address, capacity, cost, facilities, image,
    } = req.body;

    const userId = req.decoded.id;

    let center;

    try {
      center = await Centers.create({
        name,
        address,
        capacity,
        cost,
        facilities,
        image,
        userId,
      })
    }
    catch (err) {
      next(err);
    }

    if (center) {
      const { userType } = req.decoded;
      if (userType !== 'admin') {
        return res.status(401).send({
          status: 'Failure',
          message: 'Sorry, you do not have required priviledge to add new center. Please, contact the admin at andevents@gmail.com',
        });
      }
      return res.status(201).send({
        status: 'Success',
        message: 'Center added successfully',
        center
      });
    }
  }

  /**
     * parse values from the req.body & req.decoded
     * @param {object} req - The request object from the client
     * @param {object} res - The response object to the client
     * @returns {object} JSON -The JSON returned to the client as response containing all centers
     * @static
     * @memberof Center
     */
  static async listAll(req, res, next) {
    let centers;
    try {
      centers = await Centers
        .findAll({
          order: [['name', 'ASC']],
        })
    }
    catch (err) {
      next(err)
    }

    if (centers) {
      return res.status(200).send({
        status: 'Success',
        message: 'List of Centers',
        centers
      });
    }
  }

  /**
 * Get the details of a center
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static async getCenter(req, res, next) {
    let center;

    try {
      center = await Centers.findOne({
        where: {
          id: parseInt(req.params.id, 10),
        },
        include: [
          {
            model: Events,
            as: 'events',
          },
        ],
      })
    }
    catch (err) {
      next(err);
    }
    if (center) {
      return res.status(200).send({
        status: 'Success',
        message: 'One gotten successfully',
        center,
      });
    }

    return res.status(404).send({
      status: 'Failure',
      message: 'Sorry, the selected center cannot be found',
    });
  }

  /**
* parse values from the req.body & req.decoded
* @param {object} req - The request object from the client
* @param {object} res - The response object to the client
* @return {object|JSON|array} - JSON is returned signifying success or failr of
*                              the modified event.
* @static
* @memberof Center
*/

  static async updateCenter(req, res, next) {
    /* Grab values to be used to authenticate from the request object */
    const userId = req.decoded.id;
    let center;
    try {
      center = await Centers
        .find({
          where: {
            id: parseInt(req.params.id, 10),
            userId,
          },
        })
    }
    catch (err) {
      next(err);
    }

    if (!center) {
      return res.status(404).send({
        status: 'Failure',
        message: 'Sorry, the center cannot be found',
      });
    }

    let updatedCenter;

    try {
      updatedCenter = await center
        .update({
          name: req.body.name || center.name,
          address: req.body.address || center.address,
          capacity: req.body.capacity || center.capacity,
          cost: req.body.cost || center.cost,
          facilities: req.body.facilities || center.facilities,
          image: req.body.image || center.image,
          available: true || center.available,
        })
    } catch (err) {
      next(err)
    }

    return res.status(200).send({
      status: 'Success',
      message: 'Center details updated successfully',
      data: updatedCenter,
    })
    
  }
}