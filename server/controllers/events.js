// import dependencies
import models from '../models';
import { UpdateCenter } from './centers';

const { Events, Centers } = models;

/**
 * This is a AddNewCenter class that allows a client to signup
 * @export
 * @class AddNewCenter
 */
export default class Event {
  /**
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} JSON - this is returned to notify the user of event creation
 * @static
 * @memberof Event
 */
  static async addEvent(req, res, next) {
    const {
      title, description, event_type, estimated_attendees, lga, centerId,
    } = req.body;

    let center, event, newEvent;
    let { event_date } = req.body;
    event_date = Date.parse(event_date);
    const userId = req.decoded.id;

    try {
      center = await Centers.findOne({
        where: {
          id: centerId,
        },
      })
    } catch (err) {
      next(err);
    }

    if (!center) {
      return res.status(404).send({
        status: 'Failure',
        message: 'Sorry, center not found. You cannot host an event in a center that does not exist ...',
      });
    }

    try {
      event = await Events
        .findOne({
          where: {
            event_date,
            centerId,
          }
        })
    } catch (err) {
      next(err);
    }

    if (event) {
      return res.status(400).send({
        status: 'Failure',
        error: 'Another event has been slated for the selected center. Please choose another date or center'
      })
    }

    try {
      newEvent = await Events
        .create({
          title,
          description,
          event_type,
          estimated_attendees,
          event_date,
          lga,
          centerId,
          userId,
        })
    } catch (err) {
      next(err);
    }

    if (newEvent) {
      return res.status(201).send({
        status: 'Success',
        message: 'Event successfully added',
        newEvent
      })
    }
  }

  /**
 * parse values from the req.body & req.decoded
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object|JSON|array} - JSON is returned signifying success or failr of
 *                              the modified event.
 * @static
 * @memberof Event
 */
  static async updateEvent(req, res, next) {
    /* Grab values to be used to authenticate from the request object */
    const userId = req.decoded.id;
    const { event_date, centerId } = req.body;

    const id = req.params.id;

    let event, updatedEvent;

    try {
      event = await Events.findOne({
        where: {
          event_date,
          centerId
        }
      })
    } catch (err) {
      next(err);
    }

    if (event) {
      return res.status(400).send({
        status: 'Failure',
        error: 'Another event has been slated for the chosen center. Please choose another date or center'
      });
    }

    try {
      event = await Events.findOne({
        where: {
          id,
          userId
        }
      })
    } catch (err) {
      next(err)
    }

    if (event) {
      try {
        updatedEvent = await event.update({
          title: req.body.title || event.title,
          description: req.body.description || event.description,
          event_type: req.body.event_type || event.event_type,
          estimated_attendees: req.body.estimated_attendees || event.estimated_attendees,
          event_date: req.body.event_date || event.event_date,
          lga: req.body.lga || event.lga,
          userId,
          centerId: req.body.centerId || event.centerId,
        })
      } catch (err) {
        next(err)
      }

      if (updatedEvent) {
        res.status(200).send({
          status: 'Success',
          message: 'Event updated successfully',
          updatedEvent,
        })
      }
    }

    return res.status(400).send({
      status: 'Failure',
      error: 'Event not found'
    });

  }

  /**
* parse values from the req.body & req.decoded to be used to delete the event
* @static
* @param {object} req - The request object from the client
* @param {object} res - The response object to the client
* @return {object} JSON object notifying the success of the delete request
* @memberof Event
*/
  static async deleteEvent(req, res, next) {
    /* Checks if user is authenticated */
    const userId = req.decoded.id;
    let event;

    /* if authenticated, we find the event we want to delete */
    try {
      event = await Events.find({
        where: {
          id: parseInt(req.params.id, 10),
          userId,
        },
      })
    } catch (err) {
      next(err);
    }

    if (!event) {
      return res.status(404).send({
        status: 'Failure',
        message: 'Event Not Found',
      });
    }
    /* Then we delete the event */
    return res.status(200).send({
      status: 'Success',
      message: 'Event successfully deleted',
    });
    // .catch(err => res.status(404).send(err));
  }
}
