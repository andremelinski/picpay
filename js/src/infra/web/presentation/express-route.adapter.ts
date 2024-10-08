import { Request, Response } from 'express';

import { HttpResponse, HttpRequest, IController } from './interfaces';

// adapting the requests com 
export const adaptRoute = (controller: IController) => {
	return async (req: Request, res: Response) => {
		const httpRequest: HttpRequest = { body: req.body, params: req.params };

		const httpResponse: HttpResponse = await controller.handle(httpRequest);

		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			res.status(httpResponse.statusCode).json(httpResponse.body);
		} else {
			res.status(httpResponse.statusCode).json({ error: httpResponse.body.message });
		}
		// res.status(httpResponse.statusCode).json(httpResponse.body);
	};
};