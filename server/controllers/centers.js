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
    const { userType } = req.decoded;
    if (userType !== 'admin') {
      return res.status(401).send({
        status: 'Error accessing the resource',
        message: 'Sorry, you do not have the required priviledge to the resource',
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
          center
        });
      })
      .catch(err => res.status(500).send({
        status: `Error adding new center`,
        message: err.message,
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
      .then((centers) => {
        /* Checks if db is empty and returns a notice to enter a recipe */
        if (centers.length === 0) {
          return res.status(400).send({
            status: 'Empty list found',
            message: 'Sorry, No center is available',
            centers
          });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'List of Centers',
          centers
        });
      })
      .catch(error => res.status(500).send({
        status: `Error getting list of centers`,
        message: error.message,
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
    return Centers
    .findOne({
      where: {
        id: parseInt(req.params.id,10),
      },
      include: [
        {
          model: Events,
          as: 'events',
        },
      ],
    })
      .then((center) => {
        if (!center) {
          return res.status(404).send({
            status: 'Error getting the center',
            message: 'Sorry, the selected center cannot be found',
          });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'Centers below',
          center,
        });
      })
      .catch(error => res.status(500).send({
        status: `Error getting the center`,
        message: error.message,
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
            status: 'Error updating the center details',
            message: 'Sorry, the center cannot be found',
          });
        }

        /* Updates the event and returns the updated event */
        return center
          .update({
            name: req.body.name || center.name,
            address: req.body.address || center.address,
            capacity: req.body.capacity || center.address,
            cost: req.body.cost || center.cost,
            facilities: req.body.facilities || center.facilities,
            image: req.body.image || center.image,
            available: true || center.available,
          })
          .then(updatedCenter => res.status(200).send({
            status: 'Success',
            message: 'Center details updated successfully',
            data: updatedCenter,
          }))
          .catch(err => res.status(500).send({
            status: `Error updating center details`,
            message: err.message,
          }));          
      })
      .catch(err => res.status(500).send({
        status: `Error updating center details`,
        message: err.center,
      }));
  }
}
