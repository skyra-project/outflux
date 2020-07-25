import 'module-alias/register';
import { API_KEYS, PORT, SENTRY_URL } from '@root/config';
import sentry from '@sentry/node';
import fastify from 'fastify';
import bearerAuthPlugin from 'fastify-bearer-auth';

if (SENTRY_URL) sentry.init({ dsn: SENTRY_URL });

const server = fastify();
void server.register(bearerAuthPlugin, { keys: API_KEYS });

server.listen(Number(PORT), (err) => {
	console.log(`Fastify Outflux listening on port ${PORT}`);
	if (err) {
		server.log.error(err.message);
		sentry.captureException(err);
		process.exit(1);
	}
});
