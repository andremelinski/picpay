import { InvalidParamError } from "../http/errors/invalid-param.error";
import { IValidation } from "./validator.composite";

export class RequiredFieldValidation implements IValidation {
	constructor(private readonly requiredField: string) {}

	// eslint-disable-next-line consistent-return
	validate(object: any): Error | undefined {
		if (!object[this.requiredField]) {
			return new InvalidParamError(`missing params ${this.requiredField}`);
		}
	}
}