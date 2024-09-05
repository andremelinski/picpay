import { HttpResponse, HttpRequest } from "./http.interface";

export interface IController {
	handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}

export interface IMiddleware {
	handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}