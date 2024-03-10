import { Router } from "express";
import { SubjectRepositoryImplementation } from "../../infraestucture/subjects/repositories/subject.repository";
import { SubjectDataSourceImplementation } from "../../infraestucture/subjects/dataSources/subject.datasource";
import { SubjectController } from "./controller";

export class SubjectRoutes {

  static get routes(): Router {

    const dataSource = new SubjectDataSourceImplementation();
    const subjectRepository = new SubjectRepositoryImplementation( dataSource );
    const subjectController = new SubjectController( subjectRepository );

    const router = Router();

    router.get('/', subjectController.getAllSubjects);
    router.get('/:id', subjectController.GetSubjectByID);
    router.post('/', subjectController.CreateSubject);
    router.put('/:id', subjectController.updateSubject);
    router.delete('/:id', subjectController.deleteSubject);

    return router
  }

}