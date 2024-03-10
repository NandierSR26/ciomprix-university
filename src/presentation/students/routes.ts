import { Router } from "express";
import { StudentController } from "./controller";
import { StudentDataSourceImplementation } from "../../infraestucture/dataSources/student.datasource";
import { StudentRepositoryImplementation } from "../../infraestucture/repositories/student.repository";

export class StudentRoutes {

  static get routes(): Router {
    const router = Router();

    const dataSource = new StudentDataSourceImplementation();
    const studentRepository = new StudentRepositoryImplementation( dataSource );
    const studentsController = new StudentController( studentRepository );

    router.get('/', studentsController.getAllStudents);
    router.get('/:id', studentsController.getStudentByID);
    router.post('/', studentsController.CreateStudent);
    router.put('/:id', studentsController.updateStudent);
    router.delete('/:id', studentsController.deleteStudent)

    return router;
  }

}