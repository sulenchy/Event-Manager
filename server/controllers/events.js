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
      title, description, event_type, estimated_attendees, lga, centerId,
    } = req.body;
    let { event_date } = req.body;
    event_date = Date.parse(event_date);
    const userId = req.decoded.id;
    return Events
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
      .then((event) => {
        res.status(201).send({
          status: 'Success',
          message: 'Center added successfully',
          username: event.name,
          id: event.id,
        });
      })
      .catch(err => res.status(400).send({
        status: err.message,
        message: 'Sorry, Invalid data supplied',
      }));
  }
}

export class UpdateEvent {
/**
 * parse values from the req.body & req.decoded
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object|JSON|array} - JSON is returned signifying success or failr of
 *                              the modified event.
 * @static
 * @memberof UpdateEvent
 */
  static updateEvent(req, res) {
    /* Grab values to be used to authenticate from the request object */
    const userId = req.decoded.id;

    /* Finds a event to be updated */
    return Events
      .find({
        where: {
          id: parseInt(req.params.id, 10),
          userId,
        },
      })
      .then((event) => {
        if (!event) {
          return res.status(404).send({
            status: 'Event Not Found Error',
            message: 'Sorry, the selected event cannot be found',
            data: event,
          });
        }
        /* Updates the event and returns the updated event */
        return event
          .update({
            title: req.body.title || event.title,
            description: req.body.description || event.description,
            event_type: req.body.event_type || event.event_type,
            estimated_attendees: req.body.estimated_attendees || event.estimated_attendees,
            event_date: req.body.event_date || event.event_date,
            lga: req.body.lga || event.lga,
            userId,
            centerId: req.body.centerId || event.centerId,
          })
          .then(updatedRecipe => res.status(200).send({
            status: 'Success',
            message: 'Event updated successfully',
            data: updatedRecipe,
          }));
        // .catch(err => res.status(400).send(err));
      })
      .catch(() => res.status(400).send({
        status: 'Error finding Event',
        message: 'Sorry, Event cannot be found. Please supply valid event id',
      }));
  }
}

export class DeleteEvent {

}
