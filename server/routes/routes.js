import express from 'express';
import path from 'path';
import auth from '../auth/auth';
import Users from '../controllers/users';
import Center from '../controllers/centers';
import Event from '../controllers/events';
import UserValidation from '../middlewares/UserValidation';
import CenterValidation from '../middlewares/CenterValidation';


const router = express.Router();


/* Event Manager Endpoint */
router.get('/api/v1/home', (req, res) => {
  res.status(200).send({
    status: 'Success',
    message: 'Welcome to Andevents API Endpoint!',
  });
});


/* Signin and Signup API Endpoint */
router.post('/api/v1/users/signup', UserValidation.validateUserSignUp, Users.signUp);
router.post('/api/v1/users/signin', UserValidation.validateUserSignIn, Users.signIn);
router.get('/api/v1/centers', Center.listAll);

// authenticate the secure endpoint
router.use(auth.verifyUser);

/**
 * Centers endpoints requiring authentication before getting access
 *to different points of the routerlication
 */
router.post('/api/v1/centers', CenterValidation.validateAddNewCenter, Center.addNew);
router.get('/api/v1/centers/:id', Center.getCenter);
router.put('/api/v1/centers/:id', CenterValidation.validateUpdateCenter, Center.updateCenter);

/**
 * Events endpoints requiring authentication before getting access
 *to different points of the routerlication
 */
router.post('/api/v1/events', Event.addEvent);
router.put('/api/v1/events/:id', Event.updateEvent);
router.delete('/api/v1/events/:id', Event.deleteEvent);

router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../client/index.html'));
});

export default router;
