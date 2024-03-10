import { Router } from "express";
import { StudentController } from "./controller";
import { StudentDataSourceImplementation } from "../../infraestucture/students/dataSources/student.datasource";
import { StudentRepositoryImplementation } from "../../infraestucture/students/repositories/student.repository";
import { RolMiddleware } from "../middlewares/rol-middleware";

export class StudentRoutes {

  static get routes(): Router {
    const router = Router();

    const dataSource = new StudentDataSourceImplementation();
    const studentRepository = new StudentRepositoryImplementation( dataSource );
    const studentsController = new StudentController( studentRepository );

    router.get('/', RolMiddleware.verifyUserRol, studentsController.getAllStudents);
    router.get('/:id', studentsController.getStudentByID);
    router.post('/', RolMiddleware.verifyUserRol, studentsController.CreateStudent);
    router.put('/:id', studentsController.updateStudent);
    router.delete('/:id', studentsController.deleteStudent)

    return router;
  }

}