import { env } from '@/env'
import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { petsRoutes } from './infra/http/fastify/routes/pets'
import { ZodError } from 'zod'
import { orgsRoutes } from './infra/http/fastify/routes/orgs'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(orgsRoutes)

app.register(petsRoutes, {
  prefix: '/pets',
})

// Errors

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Vadation error', issues: error.format() })
  }

  if (env.NODE_ENV === 'dev') {
    console.log(error)
  } else {
    // Here we should log to an external tool like Datadog/newRelic/Sentry
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
