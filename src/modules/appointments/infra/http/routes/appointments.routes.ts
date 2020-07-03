import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppoinmentsController from '../controllers/ProviderAppoinmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppoinmentsController = new ProviderAppoinmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providerAppoinmentsController.index);

export default appointmentsRouter;
