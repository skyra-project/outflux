import { createSnapshot } from '#lib/snapshot';
import { PORT } from '#root/config';
import fastify from 'fastify';

const server = fastify();

server.get('/', async (_, response) => {
	console.log('Requesting snapshot');

	const screenshot = await createSnapshot();

	await response //
		.header('Content-Type', 'image/png') //
		.send(screenshot);
});

server.listen(Number(PORT), (err) => {
	console.log(`Outflux listening on port ${PORT}`);
	if (err) {
		server.log.fatal(err.message);
		process.exit(1);
	}
});
