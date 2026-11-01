jest.mock('./firebase.service', () => ({
  FirebaseService: class FirebaseService {},
}));

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let checkToken: jest.Mock;

  beforeEach(async () => {
    checkToken = jest.fn().mockResolvedValue({ valid: true, uid: 'user-123' });
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn().mockReturnValue('Hello World!'),
            checkToken,
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('checkToken', () => {
    it('passes a bearer token to the service', async () => {
      await expect(appController.checkToken('Bearer test-token')).resolves.toEqual({
        valid: true,
        uid: 'user-123',
      });
      expect(checkToken).toHaveBeenCalledWith('test-token');
    });

    it('rejects a missing bearer token', () => {
      expect(() => appController.checkToken()).toThrow('Missing or malformed bearer token');
    });
  });
});
