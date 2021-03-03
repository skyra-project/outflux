export const PORT = process.env.OUTFLUX_PORT ?? 8286;
export const API_KEYS = new Set<string>([]);
export const INFLUX = {
	BASE_URL: process.env.INFLUX_BASE_URL ?? 'http://localhost:8285',
	ORG_ID: process.env.INFLUX_ORG_ID ?? 'Skyra-Project',

	INFLUX_LOGIN_USERNAME: process.env.INFLUX_USERNAME ?? 'admin',
	INFLUX_LOGIN_PASSWORD: process.env.INFLUX_PASSWORD ?? 'influxadmin'
};

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface ProcessEnv {
			OUTFLUX_PORT?: string;
			INFLUX_BASE_URL?: string;
			INFLUX_ORG_ID?: string;
			INFLUX_USERNAME?: string;
			INFLUX_PASSWORD?: string;
		}
	}
}
