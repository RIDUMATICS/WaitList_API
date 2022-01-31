import { Type } from '../src/interface';
import RegisterController from '../src/controllers/register.controller';
import { TestHelper } from './testUtils';
import supertest from 'supertest';
import app from '../src/loader';

const request = supertest(app);

beforeAll(async () => {
  await TestHelper.instance.setupTestDB();
});

afterAll(() => TestHelper.instance.closeTestDB());

const email = 'custom@gmail.com';

test('should add Investors to waitlist without description', async () => {
  const user = TestHelper.instance.generateUserData({ email });
  // remove description from user
  delete user.description;

  const response = await request.post('/api/register').send(user);

  expect(response.status).toBe(201);
  expect(response.body.message).toBe('Successfully added to the waitlist');
  expect(response.body.data.type).toBe(Type.Investors);
  expect(response.body.data.description).toBe(null);
  expect(response.body.data.fullName).toBe(user.fullName);
  expect(response.body.data.email).toBe(user.email);
  expect(response.body.data.createdAt).toBeDefined();
  expect(response.body.data.updatedAt).toBeDefined();
  expect(response.body.data.id).toBeDefined();
});

test('should throw an error when Asset listers try to register without description', async () => {
  const controller = new RegisterController();
  const user = TestHelper.instance.generateUserData({
    type: Type.AssetListers,
  });

  // remove description from user
  delete user.description;

  const response = await request.post('/api/register').send(user);
  expect(response.body.status).toBe(422);
  expect(response.body.message).toBe('Validation error');
  expect(response.body.error).toEqual(
    expect.arrayContaining(['description is required']),
  );
});

it('should throw an error if email already exists', async () => {
  const user = TestHelper.instance.generateUserData({
    email,
  });

  const response = await request.post('/api/register').send(user);
  expect(response.body.status).toBe(409);
  expect(response.body.message).toBe('Email already exists');
  expect(response.body.error).toEqual(
    expect.objectContaining({ email: 'Email already exists' }),
  );
});

it('should add Asset listers to waitlist if description exists', async () => {
  const user = TestHelper.instance.generateUserData({
    type: Type.AssetListers,
  });

  const response = await request.post('/api/register').send(user);

  expect(response.status).toBe(201);
  expect(response.body.message).toBe('Successfully added to the waitlist');
  expect(response.body.data.type).toBe(Type.AssetListers);
  expect(response.body.data.description).not.toBeNull();
  expect(response.body.data.description).not.toBe(''); // description can not be empty
  expect(response.body.data.fullName).toBe(user.fullName);
  expect(response.body.data.email).toBe(user.email);
  expect(response.body.data.createdAt).toBeDefined();
  expect(response.body.data.updatedAt).toBeDefined();
  expect(response.body.data.id).toBeDefined();
});

it('should add Investors to waitlist if description exists', async () => {
  const user = TestHelper.instance.generateUserData({
    type: Type.Investors,
  });

  const response = await request.post('/api/register').send(user);

  expect(response.status).toBe(201);
  expect(response.body.message).toBe('Successfully added to the waitlist');
  expect(response.body.data.type).toBe(Type.Investors);
  expect(response.body.data.description).not.toBeNull();
  expect(response.body.data.description).not.toBe(''); // description can not be empty
  expect(response.body.data.fullName).toBe(user.fullName);
  expect(response.body.data.email).toBe(user.email);
  expect(response.body.data.createdAt).toBeDefined();
  expect(response.body.data.updatedAt).toBeDefined();
  expect(response.body.data.id).toBeDefined();
});
