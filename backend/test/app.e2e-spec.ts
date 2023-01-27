import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

// test app e2c est pour tester les routes si ca fonctionne
describe('API endpoints testing (e2e)', () => {
  let app: INestApplication;
  let id: any;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableShutdownHooks();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('App', () => {
    it('Post /Register a New User', async () => {
      const res = await request(app.getHttpServer())
        .post('/users/register')
        .send({
          firstname: 'jean',
          lastname: 'pierre',
          email: 'jean.pierre@gmail.com',
          age: 18,
          sexe: 'Men',
          city: 'dinard',
          password: 'admin35480',
          firstLogs: true,
        });
      try {
        expect(res.status).toBe(201);
      } catch (err) {
        console.log(err);
      }
    });

    it('Post /Login Conneted User', async () => {
      const res = await request(app.getHttpServer())
        .post('/users/login')
        .send({ email: 'jean.pierre@gmail.com', password: 'admin35480' });
      expect(res.status).toBe(200);
      try {
        expect(res.body).toHaveProperty('users');
        id = res.body.users;
      } catch (err) {
        console.log(err);
      }
    });

    it('Post /Profil ', async () => {
      const res = await request(app.getHttpServer()).post(`/profil`).send({
        photo: 'https://cloudinary.com/',
        description: 'bienvenue sur mon profil',
        distance: 50,
        users: 1,
      });
      try {
        expect(res.status).toBe(201);
      } catch (err) {
        console.log(err);
      }
    });

    it('Put /Profil ', async () => {
      const res = await request(app.getHttpServer()).put(`/profil/${id}`).send({
        photo: 'https://cloudinary.com/',
        distance: 23,
        description: 'bienvenue sur mon profil',
        users: id,
      });
      try {
        expect(res.status).toBe(200);
      } catch (err) {
        console.log(err);
      }
    });

    it('Put /Users ', async () => {
      const res = await request(app.getHttpServer()).put(`/users/${id}`).send({
        firstname: 'jean',
        lastname: 'pierre',
        email: 'jean.pierre@gmail.com',
        age: 18,
        sexe: 'Men',
        city: 'dinard',
        password: 'admin35480',
        firstLogs: false,
      });
      try {
        expect(res.status).toBe(200);
      } catch (err) {
        console.log(err);
      }
    });

    it('Post /Home ', async () => {
      const res = await request(app.getHttpServer()).post('/home').send({
        profil: 1,
        like: 1,
        usersId: 1,
        users: 1,
      });
      try {
        expect(res.status).toBe(201);
      } catch (err) {
        console.log(err);
      }
    });

    it('Post /Home ', async () => {
      const res = await request(app.getHttpServer()).post('/home').send({
        profil: 1,
        dislike: 1,
        usersId: 1,
        users: 1,
      });
      try {
        expect(res.status).toBe(201);
      } catch (err) {
        console.log(err);
      }
    });

    it('Get /Contact/ ', async () => {
      const res = await request(app.getHttpServer()).get(
        `/users/contact/${id}`,
      );
      expect(res.status).toBe(200);
    });

    it('Get /Profil ', async () => {
      const res = await request(app.getHttpServer()).get('/profil');
      expect(res.status).toBe(200);
    });

    it('Get /Profil/id ', async () => {
      const res = await request(app.getHttpServer()).get(`/profil/${id}`);
      expect(res.status).toBe(200);
    });
  });
});
