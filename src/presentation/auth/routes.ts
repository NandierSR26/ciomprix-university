import { StudentController } from './../students/controller';
import { Router } from "express";
import { AuthControllers } from "./controllers";
import { LoginRepositoryImplementation } from "../../infraestucture/auth/repositories/login.repository";
import { LoginDataSourceImplementation } from "../../infraestucture/auth/dataSource/login.datasource";
import { StudentDataSourceImplementation } from "../../infraestucture/students/dataSources/student.datasource";
import { StudentRepositoryImplementation } from "../../infraestucture/students/repositories/student.repository";
import { validateUsersExists } from '../middlewares/users-middleware';

export class AuthRoutes {

  static get routes(): Router {

    const router = Router();

    const dataSource = new LoginDataSourceImplementation()
    const loginRepository = new LoginRepositoryImplementation( dataSource )
    const authController = new AuthControllers( loginRepository )

    const dataSourceStudents = new StudentDataSourceImplementation();
    const studentRepository = new StudentRepositoryImplementation( dataSourceStudents );
    const studentController = new StudentController( studentRepository )

    router.post('/login', [
      validateUsersExists.validateEmailExistsLogin
    ], authController.login);

    router.post('/register', [
      validateUsersExists.validateDNI,
      validateUsersExists. validateEmail,
    ], studentController.CreateStudent);

    return router;

  }

}