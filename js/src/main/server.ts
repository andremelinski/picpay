import PostgreSQL from '../infra/database/sql/connection';
import app from './config/app';
import env from './config/env';


PostgreSQL.getDatabaseConnection()
	.then(async () => {
	// avoiding to import some dependencie that require db connection before db connection
		const app = (await import('./config/app')).default;

		app.listen(env.HTTP_PORT, () => {
			console.log(`listening at: http://localhost:${env.HTTP_PORT}`);
		});
	})
	.catch((err) => {
		return console.error(err);
});