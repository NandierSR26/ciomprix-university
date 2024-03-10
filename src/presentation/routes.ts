import { Router } from 'express'
import { StudentRoutes } from './students/routes';
import { SubjectRoutes } from './subjects/routes';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/students', StudentRoutes.routes);
    router.use('/api/subjects', SubjectRoutes.routes);
  
    return router;
  }
}
