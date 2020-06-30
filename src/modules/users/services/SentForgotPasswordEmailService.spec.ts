// import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SentForgotPasswordEmailService from './SentForgotPasswordEmailService';

describe('SentForgotPasswordEmailService', () => {
  it('should be able to recover the password using the e-mail', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SentForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

    await fakeUsersRepository.create({
      name: 'Raphael Barreto',
      email: 'tnt.raphael@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'tnt.raphael@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
