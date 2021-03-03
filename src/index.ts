import '#lib/routes';
import { server } from '#lib/server';
import { PORT } from '#root/config';

server.listen(Number(PORT), (err) => {
	console.log(`Fastify Outflux listening on port ${PORT}`);
	if (err) {
		server.log.fatal(err.message);
		process.exit(1);
	}
});
