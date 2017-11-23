// import dependencies
import { Centers, Events } from '../models';

/**
 * This is a AddNewCenter class that allows a admin to add new center
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
        status: `Operation ${err.status}`,
        message: 'This center name already exist or invalid data supplied',
      }));
  }
}

/**
 * This is a GetCenterList class that allows you get all center a user has posted
 * @export listAll method
 * @class GetCenterList
 */
export class GetCenterList {
  /**
     * parse values from the req.body & req.decoded
     * @param {object} req - The request object from the client
     * @param {object} res - The response object to the client
     * @returns {object} JSON -The JSON returned to the client as response containing all centers
     * @static
     * @memberof GetCenterList
     */
  static listAll(req, res) {
    /* Get all recipes */
    return Centers
      .findAll({
        order: [['name', 'ASC']],
      })
      .then((center) => {
        /* Checks if db is empty and returns a notice to enter a recipe */
        if (center.length === 0) {
          return res.status(400).send({
            status: 'Empty list found',
            message: 'Sorry, No center is available.',
            data: center,
          });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'Centers below',
          data: center,
        });
      })
      .catch(error => res.status(400).send({
        status: `Operation ${error.status}`,
        message: 'Getting list of event failed',
      }));
  }
}

/**
 * This is a GetCenterWithClient class that allows a user to get a center with slated event
 * @export
 * @class GetCenterWithEvent
 */
export class GetCenterWithEvent {
  /**
   * Get the details of a center
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static getCenter(req, res) {
    Centers.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Events,
          as: 'events',
        },
      ],
    })
      .then((center) => {
      /* Checks if db is empty and returns a notice to enter a Center */
        if (center.length === 0) {
          return res.status(400).send({
            status: 'Fail',
            message: 'No Center available, please enter a Center.',
            data: center,
          });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'Centers below',
          data: center,
        });
      })
      .catch(error => res.status(400).send({
        status: `Center ${error.status}`,
        message: 'Selected center cannot be found',
      }));
  }
}


/**
 * This is a UpdateCenter class that allows a user to update center
 * @export
 * @class UpdateCenter
 */

export class UpdateCenter {
  /**
 * parse values from the req.body & req.decoded
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object|JSON|array} - JSON is returned signifying success or failr of
 *                              the modified event.
 * @static
 * @memberof UpdateEvent
 */

  static updateCenter(req, res) {
    /* Grab values to be used to authenticate from the request object */
    const userId = req.decoded.id;

    /* Finds a event to be updated */
    return Centers
      .find({
        where: {
          id: parseInt(req.params.id, 10),
          userId,
        },
      })
      .then((center) => {
        if (!center) {
          return res.status(404).send({
            status: 'Error finding the Event',
            message: 'Sorry, the selected event cannot be found',
            data: center,
          });
        }
        /* Updates the event and returns the updated event */
        return center
          .update({
            available: center.available === true ? false : true,
          })
          .then(updatedCenter => res.status(200).send({
            status: 'Success',
            message: 'Center details updated successfully',
            data: updatedCenter,
          }));
        // .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send({
        status: `Center ${err.status}: Error finding center`,
        message: 'Sorry, Center cannot be found. Please supply valid center id',
      }));
  }
}
