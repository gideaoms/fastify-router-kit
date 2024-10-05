# fastify-router-kit

## Installation
```cmd
npm install --save fastify-router-kit
```

## Configure Plugin
```ts
// src/app.ts
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import fastify from 'fastify'
import router from 'fastify-router-kit'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const server = fastify()

server.register(router, { 
  dir: join(__dirname, 'app')
})

server.listen({ port: 3333 })
```

## Define Route
```ts
// src/app/cities/route.ts
import { route } from "fastify-router-kit";

export const GET = route({
	async handler(request) {
		return ["New York", "Tokio", "Barcelona"]
	},
});
```

## Define Route With Param
```ts
// src/app/cities/:id/route.ts (:id is a folder)
import { route } from "fastify-router-kit";

export const GET = route({
  schema: {
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'number'
        }
      },
      required: ['id']
    }
  },
	async handler(request) {
		return request.params.id
	},
});
```