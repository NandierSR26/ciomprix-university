import { Request, Response } from "express";
import { StudentRepository } from "../../domain/students/repositories/student.repository";
import { CreateStudentDTO } from "../../domain/students/dtos/create.dto";
import { handleError, handleSuccess } from "../../config/handleResponse";
import { CreateStudent } from "../../domain/students/useCases/create";
import { GetAllStudents } from "../../domain/students/useCases/getAll";
import { UpdateStudenDTO } from "../../domain/students/dtos/update.dto";
import { UpdateStudent } from "../../domain/students/useCases/update";
import { GetStudentByID } from "../../domain/students/useCases/getByID";
import { DeleteStudent } from "../../domain/students/useCases/delete";
import { CreateAdminDTO } from "../../domain/students/dtos/create-admin.dto";
import { CreateAdmin } from "../../domain/students/useCases/create-admin";
import { TopStudentsWithEvidences } from "../../domain/students/useCases/top-students";

export class StudentController {

  constructor(
    private readonly studentRepository: StudentRepository
  ) { }

  public getAllStudents = (req: Request, res: Response) => {
    new GetAllStudents(this.studentRepository)
      .execute()
      .then(data => handleSuccess({ code: 200, message: 'Students list', res, data }))
      .catch(error => handleError({ code: 500, message: error, res, error }))
  }

  public getStudentByID = (req: Request, res: Response) => {
    new GetStudentByID(this.studentRepository)
      .execute(req.params.id)
      .then(data => handleSuccess({ code: 200, message: `Student ${req.params.id} found`, res, data }))
      .catch(error => handleError({ code: 500, message: error, res, error }))

  }

  public CreateStudent = (req: Request, res: Response) => {

    const [error, createStudentDTO] = CreateStudentDTO.create(req.body);
    if (error) {
      return handleError({ code: 400, message: error, res })
    }

    new CreateStudent(this.studentRepository)
      .execute(createStudentDTO!)
      .then(student => handleSuccess({ code: 200, message: 'Student created', res, data: student }))
      .catch(error => {
        handleError({ code: 500, message: error, res, error })
      })
  }

  public createAdmin = (req: Request, res: Response) => {
    const [error, createAdminDTO] = CreateAdminDTO.create(req.body);
    if (error) {
      return handleError({ code: 400, message: error, res })
    }

    new CreateAdmin(this.studentRepository)
      .execute(createAdminDTO!)
      .then(student => handleSuccess({ code: 200, message: 'Admin created', res, data: student }))
      .catch(error => {
        handleError({ code: 500, message: error, res, error })
      })
  }

  public updateStudent = (req: Request, res: Response) => {

    const { user } = req.body;
    const { id } = req.params;

    if (user.id !== id) return handleError({ code: 401, message: 'You cannot edit this account', res });

    const [error, updatedStudentDTO] = UpdateStudenDTO.create({ ...req.body, id: req.params.id });
    if (error) return handleError({ code: 400, message: 'Something went wrong', res });

    new UpdateStudent(this.studentRepository)
      .execute(updatedStudentDTO!)
      .then(data => handleSuccess({ code: 200, message: 'Student updated', res, data }))
      .catch(error => console.log(error))
  }

  public deleteStudent = (req: Request, res: Response) => {

    const { user } = req.body;
    const { id } = req.params;

    if (user.id !== id) return handleError({ code: 401, message: 'You cannot delete this account', res });

    new DeleteStudent(this.studentRepository)
      .execute(req.params.id)
      .then(data => handleSuccess({ code: 200, message: `Students ${req.params.id} deleted`, res, data }))
      .catch(error => handleError({ code: 500, message: error, res, error }))
  }

  public topStudentsWithEvidences = (req: Request, res: Response) => {
    new TopStudentsWithEvidences(this.studentRepository)
      .execute()
      .then((data) => {

        var topStudents = data.map( (student:any) => {
          return {
            id: student.id,
            name: student.first_name + ' ' + student.last_name,
            evidences: student.evidences.length
          }
        } )

        handleSuccess({ 
          code: 200, 
          message: 'Top students', 
          res, 
          data: topStudents.sort((a,b) => b.evidences - a.evidences)
        })

      })
  }

}