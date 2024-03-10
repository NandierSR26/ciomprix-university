import { Router } from 'express'
import { StudentRoutes } from './students/routes';
import { SubjectRoutes } from './subjects/routes';
import { EvidencesRoutes } from './evidence/routes';
import { AuthRoutes } from './auth/routes';
import { AuthMiddleware } from './middlewares/auth-middleware';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes);

    router.use('/', AuthMiddleware.validateJWT)
    router.use('/api/students', StudentRoutes.routes);
    router.use('/api/subjects', SubjectRoutes.routes);
    router.use('/api/evidences', EvidencesRoutes.routes);
  
    return router;
  }
}
