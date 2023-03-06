


import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export class Validator {
  public async convertAndValidate<T extends object>(classToConvert: ClassConstructor<T>, body: string | object): Promise<T> {
    const data = plainToInstance(classToConvert, body);

    await this.validate(data);
    
    return data;
  }

  private async validate(data: object) {
    const validationErrors: Array<string> = this.handleErrors(await validate(data, { skipMissingProperties: false }));

    if (validationErrors.length) {
      throw new Error(validationErrors.join(", "));
    }
  }

  private handleErrors(errors: ValidationError[]): Array<string> {
    const validationErrors = [];

    if (errors.length > 0) {
      for (const errorItem of errors) {
        if (errorItem.constraints) {
          validationErrors.push(...Object.values(errorItem.constraints));
        }

        if (errorItem.children && errorItem.children.length) {
          validationErrors.push(...this.handleErrors(errorItem.children));
        }
      }
    }

    return validationErrors;
  }
}

