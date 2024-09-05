import { IAddUserDtoInput, ICreateUseCase } from "../../../usecases/user/create-user.usecase";
import { badRequest, noContent, ok, serverError } from "../../../utils/http/http-client";
import { IValidation } from "../../../utils/validator/validator.composite";
import { HttpResponse, HttpRequest, IController } from "../presentation/interfaces";

export default class CreateUserHandler implements IController {
	constructor(private readonly usecase: ICreateUseCase, private readonly validation: IValidation) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(httpRequest?.body);

			if (error) {
				return badRequest(error);
			}
			const {body} = httpRequest;
			const addUser: IAddUserDtoInput = { 
				first_name: body.first_name, 
				last_name: body.last_name, 
				document: body.document,
				email: body.email,
				password: body.password,
				user_type: body?.user_type || 'common'
			 };

			const resp = await this.usecase.create(addUser);
			
			return resp? ok(resp) : noContent();
		} catch (error) {
			return serverError(error);
		}
	}
}