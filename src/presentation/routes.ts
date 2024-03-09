import { Router } from 'express'

export class AppRoutes {

  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.get('/index', (req, res) => {
      res.send({ message: 'Hola mundo' })
    })
  
    return router;
  }
}
