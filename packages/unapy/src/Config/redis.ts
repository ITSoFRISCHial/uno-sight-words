const redisUrl = process.env.REDIS_URL

let host = process.env.REDIS_HOST
let port = process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined
let password = process.env.REDIS_PASSWORD

if (redisUrl) {
	try {
		const parsedUrl = new URL(redisUrl)

		host = parsedUrl.hostname
		port = parsedUrl.port ? Number(parsedUrl.port) : 6379
		password = parsedUrl.password || password
	} catch (error) {
		// Fall back to discrete env vars if REDIS_URL is malformed.
	}
}

export default {
	url: redisUrl,
	host,
	port,
	password,
}
