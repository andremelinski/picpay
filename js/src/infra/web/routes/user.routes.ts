import { Router } from 'express';
import { adaptRoute } from '../presentation/express-route.adapter';
import { makeCreateUserHandler } from '../factories/hello.factory';
import { makeCreateTransferHandler } from '../factories/transfer.factory';


export default async (router: Router): Promise<void> => {
	router.post('/user', adaptRoute(await makeCreateUserHandler()));
	router.post('/transfer', adaptRoute(await makeCreateTransferHandler()));
};