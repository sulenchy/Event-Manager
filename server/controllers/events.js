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
      title, description, event_type, estimated_attendees, lga, centerId
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