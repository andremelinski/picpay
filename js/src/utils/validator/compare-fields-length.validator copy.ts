import { InvalidParamError } from "../http/errors/invalid-param.error";
import { IValidation } from "./validator.composite";

export class CompareFieldLengthValidator implements IValidation {
	constructor(private readonly fieldName: string, private readonly lengthToCompare: number) {}

	// eslint-disable-next-line consistent-return
	validate(object: any): Error | undefined {
		if (object[this.fieldName].length < this.lengthToCompare) {
			return new InvalidParamError("length provided not allowed");
		}
	}
}