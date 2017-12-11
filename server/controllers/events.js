// import dependencies
import { Events, Centers } from '../models';
import { UpdateCenter } from './centers';
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
    return Centers
    .findOne({
      where: {
        id: centerId,
      },
    })
    .then((center) => {
      if (!center) {
        return res.status(400).send({
          status: 'Error finding the selected center',
          message: 'Sorry, center not found. Use an existing center id ...',
        });
      } 
      Events
      .findOne({
        where: {
          event_date,
          centerId,
        }
      })
      .then((event) => {
        if (event) {
          return res.status(400).send({ error: 'Another event is slated for the chosen center,Please choose another date or center' });
        }})
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
        .then(newEvent => res.status(201).send({ message: 'Event successfully added', newEvent }))
        .catch(err => res.status(500).send({
          status: `Error adding new event`,
          message: err.message,
        }));
    })
    .catch(err => res.status(500).send({
      status: `Error finding center`,
      message: err.message,
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
    const { event_date, centerId } = req.body;
    Events
    .findOne({
      where: {
        event_date,
        centerId,
      }
    })
    .then((event) => {
      if (event) {
        return res.status(400).send({ error: 'Another event is slated for the chosen center,Please choose another date or center' });
      }})
     
    Events
    .findOne({
      where: {
        id: req.params.id,
        userId: userId,
      }
    })
    .then((event) => {
      if(!event) {
        return res.status(400).send({error: 'Sorry, you cannot update the specified event'})
      }

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
    })
  }
}

export class DeleteEvent {
  /**
 * parse values from the req.body & req.decoded to be used to delete the event
 * @static
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} JSON object notifying the success of the delete request
 * @memberof DeleteEvent
 */
  static deleteEvent(req, res) {
    /* Checks if user is authenticated */
    const userId = req.decoded.id;

    /* if authenticated, we find the event we want to delete */
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
            status: 'Fail',
            message: 'event Not Found',
          });
        }
        /* Then we delete the event */
        return event
          .destroy()
          .then(() => res.status(200).send({
            status: 'Success',
            message: 'Event successfully deleted',
          }));
        // .catch(err => res.status(404).send(err));
      })
      .catch(() => res.status(404).send({
        status: 'Fail',
        message: 'Please enter a number',
      }));
  }
}
