import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppoinment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppoinment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await createAppoinment.execute({
      date: new Date(),
      provider_id: '12345678',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12345678');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppoinment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppoinment.execute({
      date: appointmentDate,
      provider_id: '12345678',
    });

    expect(
      createAppoinment.execute({
        date: appointmentDate,
        provider_id: '12345678',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
