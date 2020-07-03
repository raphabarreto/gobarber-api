import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppoinmentsController from '../controllers/ProviderAppoinmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppoinmentsController = new ProviderAppoinmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create
);
appointmentsRouter.get('/me', providerAppoinmentsController.index);

export default appointmentsRouter;
