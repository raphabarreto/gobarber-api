import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Raphael Barreto',
      email: 'tnt.raphael@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Diego Fernandes',
      email: 'diego@fernandes.com',
    });

    expect(updatedUser.name).toBe('Diego Fernandes');
    expect(updatedUser.email).toBe('diego@fernandes.com');
  });

  it('should not be able to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Raphael Barreto',
      email: 'tnt.raphael@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Raphael Barreto',
      email: 'raphael.tnt@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Raphael Barreto',
        email: 'tnt.raphael@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Raphael Barreto',
      email: 'tnt.raphael@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Raphael Barreto',
      email: 'tnt.raphael@gmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Raphael Barreto',
      email: 'tnt.raphael@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Raphael Barreto',
        email: 'tnt.raphael@gmail.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Raphael Barreto',
      email: 'tnt.raphael@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Raphael Barreto',
        email: 'tnt.raphael@gmail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});