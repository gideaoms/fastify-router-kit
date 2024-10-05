import { join } from "node:path";
import { readdir } from "node:fs/promises";
import type { FastifyInstance, RouteOptions } from "fastify";
import plugin from "fastify-plugin";

const SUFFIX = "/route.ts";
const VERSION = ">=4.x";

async function router(fastify: FastifyInstance, opts: { dir: string }) {
	const files = await readdir(opts.dir, { recursive: true });
	for (const file of files) {
		if (file.endsWith(SUFFIX)) {
			const route = await import(join(opts.dir, file));
			const url = `/${file.replace(SUFFIX, "")}`;
			const methods = Object.keys(route);
			for (const method of methods) {
				fastify.route({
					...route[method],
					url,
					method,
				});
			}
		}
	}
}

export const route = (opts: Omit<RouteOptions, "url" | "method">) => opts;

export default plugin(router, VERSION);
