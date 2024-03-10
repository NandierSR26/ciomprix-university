import { Router } from "express";
import { SubjectRepositoryImplementation } from "../../infraestucture/subjects/repositories/subject.repository";
import { SubjectDataSourceImplementation } from "../../infraestucture/subjects/dataSources/subject.datasource";
import { SubjectController } from "./controller";
import { ValidateEnroll } from "../middlewares/validate-enroll";

export class SubjectRoutes {

  static get routes(): Router {

    const dataSource = new SubjectDataSourceImplementation();
    const subjectRepository = new SubjectRepositoryImplementation( dataSource );
    const subjectController = new SubjectController( subjectRepository );

    const router = Router();

    router.get('/', subjectController.getAllSubjects);
    router.get('/:id', subjectController.GetSubjectByID);
    router.get('/by-user/:id', subjectController.getSubjectsByUser);

    router.post('/', subjectController.CreateSubject);
    router.post('/enroll', [ 
      ValidateEnroll.validateStudentInSubject,
      ValidateEnroll.validateAmountEnrolledSubject
    ], subjectController.enrollStudent);

    router.put('/:id', subjectController.updateSubject);

    router.delete('/:id', subjectController.deleteSubject);

    return router
  }

}