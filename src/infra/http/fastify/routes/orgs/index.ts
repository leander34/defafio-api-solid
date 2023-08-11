import { FastifyInstance } from 'fastify'
import { Register } from '../../controllers/orgs/register'
import { Authenticate } from '../../controllers/orgs/authenticate'
import { RefreshToken } from '../../controllers/orgs/refresh-token'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs/register', Register.handle)
  app.post('/sessions', Authenticate.handle)
  app.patch('/token/refresh', RefreshToken.handle)
}
