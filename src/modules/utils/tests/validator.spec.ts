


import { IsString } from "class-validator";
import { Validator } from "../validator";

describe(Validator.name, () => {
  it("converts to an instance of a class and validates that instance", async () => {
    const objectToValidate = {
      test: "test",
    };

    const validator = new Validator();
    const convertedObject = await validator.convertAndValidate(ValidatorTestDto, objectToValidate);

    expect(convertedObject).toEqual(objectToValidate);
  });

  it("throws an error if one or more attributes does not validate", async () => {
    const objectToValidate = {
      test: 12345, // should be a string
    };

    const validator = new Validator();
    const objectPromise = validator.convertAndValidate(ValidatorTestDto, objectToValidate);

    await expect(objectPromise).rejects.toThrow(Error);
  });
});

class ValidatorTestDto {
  @IsString()
  public test: string;
}

