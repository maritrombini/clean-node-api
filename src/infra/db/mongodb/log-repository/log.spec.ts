import { MongoHelper } from "../helpers/mongo-helper";
import { Collection } from "mongodb";
import { LogMongoRepository } from "./log";

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository();
};

describe("Log Mongo Repository", () => {
  let errorCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection("errors");
    await errorCollection.deleteMany({});
  });

  test("Should create an error log on success", async () => {
    const sut = makeSut();
    await sut.logError("any_error");
    const count = await errorCollection.countDocuments();
    expect(count).toBe(1);
  });
});
