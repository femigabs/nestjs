import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';

jest.mock('axios');

describe('User API (E2E)', () => {
    let app: INestApplication;
    const mockUserId = 1;
    const getUserUrl = `${process.env.regresBareUrl}/api/users/${mockUserId}`;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /api/users should create a user', () => {
        return request(app.getHttpServer())
            .post('/api/users')
            .send({
                first_name: 'John',
                last_name: 'Doe',
                email: faker.internet.email(),
            })
            //.expect(201)
            .expect((res) => {
                expect(res.body.data.first_name).toBe('john');
                expect(res.body.data.last_name).toBe('doe');
            });
    });

    it('GET /api/user/{userId} should retrieve a user', () => {
        return request(app.getHttpServer())
            .get('/api/user/1')
            .expect(200)
            .expect((res) => {
                expect(res.body.data.first_name).toBe('John');
                expect(res.body.data.last_name).toBe('Doe');
            });
    });

    describe('Delete User Avatar (E2E)', () => {
        it('GET /api/user/{userId}/avatar should retrieve the user avatar', () => {
            return request(app.getHttpServer())
                .get(`/api/user/1/avatar`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.first_name).toBe('John');
                    expect(res.body.data.last_name).toBe('Doe');
                });
        });

        it('GET /api/user/{userId}/avatar should throw error if no user', () => {
            return request(app.getHttpServer())
                .get(`/api/user/1/avatar`)
                .expect(400)
                .expect((res) => {
                    expect(res.body.message).toBe('User avatar not found');
                });
        });

    });

    describe('Delete User Avatar (E2E)', () => {
        it('DELETE /api/user/{userId}/avatar should delete the user avatar', () => {
            return request(app.getHttpServer())
                .delete(`/api/user/1/avatar`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.first_name).toBe('John');
                    expect(res.body.data.last_name).toBe('Doe');
                });
        });

        it('DELETE /api/user/{userId}/avatar should throw error if no user', () => {
            return request(app.getHttpServer())
                .delete(`/api/user/1/avatar`)
                .expect(400)
                .expect((res) => {
                    expect(res.body.message).toBe('User avatar not found');
                });
        });
    });
});
