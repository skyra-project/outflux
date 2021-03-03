import { createSnapshot } from '#lib/snapshot';
import { PORT } from '#root/config';
import fastify from 'fastify';

const server = fastify();

server.get('/', async (_, response) => {
	const screenshot = await createSnapshot();

	await response //
		.header('Content-Type', 'image/png') //
		.send(screenshot);
});

server.listen(Number(PORT), '0.0.0.0', (err, address) => {
	console.log(`Outflux listening on ${address}`);
	if (err) {
		server.log.fatal(err.message);
		process.exit(1);
	}
});
