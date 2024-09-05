import { InvalidParamError } from "../http/errors/invalid-param.error";
import { IValidation } from "./validator.composite";

export class CompareFieldValidator implements IValidation {
	constructor(private readonly fieldName: string, private readonly fieldToCompare: string) {}

	// eslint-disable-next-line consistent-return
	validate(object: any): Error | undefined {
		if (object[this.fieldName] !== object[this.fieldToCompare]) {
			return new InvalidParamError(this.fieldToCompare);
		}
	}
}