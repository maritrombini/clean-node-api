import * as request from "supertest";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
import app from "../config/app";

describe("SignUp Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  // beforeEach(async () => {
  //   const accountCollection = await MongoHelper.getCollection("accounts");
  //   await accountCollection.deleteMany({});
  // });
  test("Should return an account on success", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "Mari",
        email: "mari@email.com",
        password: "456",
        passwordConfirmation: "456",
      })
      .expect(200);
  });
});
