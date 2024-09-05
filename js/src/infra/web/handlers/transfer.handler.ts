import { ICreateTransactionUseCase, ITransferDtoInput } from "../../../usecases/transfer/crate-tranfer.usercase";
import { badRequest, ok, serverError } from "../../../utils/http/http-client";
import { HttpResponse, HttpRequest, IController } from "../presentation/interfaces";

export default class TransferHandler implements IController {
	constructor(private readonly transfer: ICreateTransactionUseCase) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const {body} = httpRequest;
			const addUser: ITransferDtoInput = { 
				amount: body.value, 
				from_user_id: body.payer, 
				to_user_id: body.payee,

			 };

			const resp = await this.transfer.transaction(addUser);
			
			return ok(resp);
		} catch (error) {
			return serverError(error);
		}
	}
}