import { Router } from "express";
import { SubjectRepositoryImplementation } from "../../infraestucture/subjects/repositories/subject.repository";
import { SubjectDataSourceImplementation } from "../../infraestucture/subjects/dataSources/subject.datasource";
import { SubjectController } from "./controller";
import { ValidateEnroll } from "../middlewares/validate-enroll";
import { RolMiddleware } from "../middlewares/rol-middleware";

export class SubjectRoutes {

  static get routes(): Router {

    const dataSource = new SubjectDataSourceImplementation();
    const subjectRepository = new SubjectRepositoryImplementation( dataSource );
    const subjectController = new SubjectController( subjectRepository );

    const router = Router();

    router.get('/', RolMiddleware.verifyUserRol, subjectController.getAllSubjects);
    router.get('/:id', subjectController.GetSubjectByID);
    router.get('/by-user/:id', subjectController.getSubjectsByUser);
    router.get('/evidences/by-subject', subjectController.evidenceBySubject);

    router.post('/', subjectController.CreateSubject);
    router.post('/enroll', [ 
      ValidateEnroll.validateStudentInSubject,
      ValidateEnroll.validateAmountEnrolledSubject
    ], subjectController.enrollStudent);

    router.put('/:id', RolMiddleware.verifyUserRol, subjectController.updateSubject);

    router.delete('/:id', RolMiddleware.verifyUserRol, subjectController.deleteSubject);

    return router
  }

}