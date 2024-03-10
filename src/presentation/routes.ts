import { Router } from 'express'
import { StudentRoutes } from './students/routes';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.get('/index', (req, res) => {
      res.send({ message: 'Hola mundo' })
    })

    router.use('/api/students', StudentRoutes.routes)
  
    return router;
  }
}
