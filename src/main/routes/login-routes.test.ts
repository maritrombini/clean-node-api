import * as request from "supertest";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
import app from "../config/app";
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection 
describe("Login Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

describe("POST /login", () => {
  test("Should return 200 on login", async () => {
    const password = await hash('456', 12)
    await accountCollection.insertOne({
      name: 'Mari',
      email: "mari@email.com",
      password
    })
    await request(app)
      .post("/api/login")
      .send({
        email: "mari@email.com",
        password: "456"
      })
      .expect(200);
  })
  test("Should return 401 on login", async () => {
    await request(app)
      .post("/api/login")
      .send({
        email: "mari@email.com",
        password: "456"
      })
      .expect(401);
    });
  });
})