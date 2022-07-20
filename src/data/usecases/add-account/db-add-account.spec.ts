import { DbAddAccount } from "./db-add-account";

describe("DbAddAccount Usecase", () => {
  test("Should call Encrypter with correct password", async () => {
    class EncrypertStub {
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve("hashed_password"));
      }
    }
    const encrypertStub = new EncrypertStub();
    const sut = new DbAddAccount(encrypertStub);
    const encryptSpy = jest.spyOn(encrypertStub, "encrypt");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });
});
