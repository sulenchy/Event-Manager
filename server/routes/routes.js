import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import auth from '../auth/auth';
import { UserSignup, UserSignin } from '../controllers/users';
import { AddNewCenter, GetCenterList, GetCenterWithEvent, UpdateCenter } from '../controllers/centers';
import { AddNewEvent, UpdateEvent, DeleteEvent } from '../controllers/events';

const router = express.Router();

// set up body-parser to parse incoming request data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ type: 'application/json' }));


/* Event Manager Endpoint */
router.get('/api/v1/home', (req, res) => {
  res.status(200).send({
    status: 'Success',
    message: 'Welcome to Andevents API Endpoint!',
  });
});

/* Signin and Signup API Endpoint */
router.post('/api/v1/users/signup', UserSignup.signUp);
router.post('/api/v1/users/signin', UserSignin.signIn);
router.get('/api/v1/centers', GetCenterList.listAll);
router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../client/index.html'));
});
// authenticate the secure endpoint
router.use(auth.verifyUser);

/**
 * Centers endpoints requiring authentication before getting access
 *to different points of the routerlication
 */

router.post('/api/v1/centers', AddNewCenter.addNew);
router.get('/api/v1/centers/:id', GetCenterWithEvent.getCenter);
router.put('/api/v1/centers/:id', UpdateCenter.updateCenter);

/**
 * Events endpoints requiring authentication before getting access
 *to different points of the routerlication
 */
router.post('/api/v1/events', AddNewEvent.addNew);
router.put('/api/v1/events/:id', UpdateEvent.updateEvent);
router.delete('/api/v1/events/:id', DeleteEvent.deleteEvent);

export default router;
