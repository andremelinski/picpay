import { Express, Router } from 'express';
import fg from 'fast-glob';

// in order to not have to add the router in every new route created we'll use fg to watch all the .routes.ts files
export default (app: Express): void => {
	const router = Router();

	app.use('/api', router);
	fg.sync('**/src/infra/web/routes/*.routes.ts').map(async file => {
		if (!file.includes('.test.') || !file.endsWith('.map')) {
			(await import(`../../../${ file }`))
				.default(router);
		}
	}
	);
};