import { PORT } from '#root/config';
import fastify from 'fastify';

const server = fastify();

server.listen(Number(PORT), (err) => {
	console.log(`Fastify Outflux listening on port ${PORT}`);
	if (err) {
		server.log.error(err.message);
		process.exit(1);
	}
});
