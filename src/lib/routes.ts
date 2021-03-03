import { server } from '#lib/server';
import { createSnapshot } from '#lib/snapshot';

server.get('/', async (_, response) => {
	server.log.debug('Requesting snapshot');

	const screenshot = await createSnapshot();

	await response //
		.header('Content-Type', 'image/png') //
		.send(screenshot);
});
