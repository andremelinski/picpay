import { NextFunction, Request, Response } from 'express';
import { HttpResponse, HttpRequest, IMiddleware } from './interfaces';


export const adaptMiddleware = (middleware: IMiddleware) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const httpRequest: HttpRequest = { headers: req.headers };
		const httpResponse: HttpResponse = await middleware.handle(httpRequest);

		if (httpResponse.statusCode === 200) {
			Object.assign(req, httpResponse.body);
			next();
		} else {
			res.status(httpResponse.statusCode).json({ error: httpResponse.body.message });
		}
	};
};