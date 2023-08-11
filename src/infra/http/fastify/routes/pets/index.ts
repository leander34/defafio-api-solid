import { FastifyInstance } from 'fastify'
import { Add } from '../../controllers/pets/add'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { verifyRole } from '../../middlewares/verify-role'
import { Details } from '../../controllers/pets/details'
import { List } from '../../controllers/pets/list'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/list', List.handle)
  app.get('/details/:id', Details.handle)
  app.post('/add', { onRequest: [verifyJWT, verifyRole('ADMIN')] }, Add.handle)
}
