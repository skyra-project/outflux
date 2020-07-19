import 'module-alias/register';
import { API_KEYS, SENTRY_URL, PORT } from '@root/config';
import * as sentry from '@sentry/node';
import fastify from 'fastify';
import * as bearerAuthPlugin from 'fastify-bearer-auth';

if (SENTRY_URL) sentry.init({ dsn: SENTRY_URL });

const server = fastify();
void server.register(bearerAuthPlugin, { keys: API_KEYS });

server.listen(PORT, err => {
	if (err) {
		server.log.error(err.message);
		sentry.captureException(err);
		process.exit(1);
	}
	server.log.info('Heyo');
});
