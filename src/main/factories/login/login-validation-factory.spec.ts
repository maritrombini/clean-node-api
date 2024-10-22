import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from "../../../presentation/helpers/validators";
import { Validation } from "../../../presentation/protocols/validation";
import { EmailValidator } from "../../../presentation/protocols/email-validator";
import { makeLoginValidation } from "../login/login-validation-factory";

jest.mock("../../../presentation/helpers/validators/validation-composite");

const makeEmailvalidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe("LoginValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeLoginValidation();
    const validations: Validation[] = [];
    for (const field of ["email", "password"]) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation("email", makeEmailvalidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
