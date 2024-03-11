import { Request, Response } from "express";
import { SubjectRepository } from "../../domain/subjects/repositories/subject.repository";
import { GetAllSubjects } from "../../domain/subjects/useCases/getAll";
import { handleError, handleSuccess } from "../../config/handleResponse";
import { GetSubjectByID } from "../../domain/subjects/useCases/getByID";
import { CreateSubjectDTO } from "../../domain/subjects/dtos/create.dto";
import { CreateSubject } from "../../domain/subjects/useCases/create";
import { UpdateSubjectDTO } from "../../domain/subjects/dtos/update.dto";
import { UpdateSubject } from "../../domain/subjects/useCases/update";
import { DeleteSubject } from "../../domain/subjects/useCases/delete";
import { EnrollStudentDTO } from "../../domain/subjects/dtos/enroll-student.dto";
import { EnrollStudent } from "../../domain/subjects/useCases/enroll-student";
import { GetSubjectsByUser } from "../../domain/subjects/useCases/getByUser";
import { EvidencesBySubject } from "../../domain/subjects/useCases/evidenceBySubject";


export class SubjectController {

  constructor(
    private readonly subjectRepository: SubjectRepository
  ) { }

  public getAllSubjects = (req: Request, res: Response) => {
    new GetAllSubjects(this.subjectRepository)
      .execute()
      .then(data => handleSuccess({ code: 200, message: 'Subjects List', res, data }))
      .catch(error => handleError({ code: 500, message: error, res, error }))

  }

  public GetSubjectByID = (req: Request, res: Response) => {

    const { id } = req.params;
    const { user } = req.body;

    if (user.id !== id) return handleError({ code: 401, message: 'You cannot access to this content', res });

    new GetSubjectByID(this.subjectRepository)
      .execute(req.params.id)
      .then(data => handleSuccess({ code: 200, message: 'Subjects found', res, data }))
      .catch(error => handleError({ code: 500, message: error, res, error }))
  }

  public getSubjectsByUser = (req: Request, res: Response) => {

    const { id } = req.params;
    const { user } = req.body;

    if (user.id !== id) return handleError({ code: 401, message: 'You cannot access to this content', res });

    new GetSubjectsByUser(this.subjectRepository)
      .execute(id)
      .then(data => handleSuccess({ code: 200, message: `Subjects of user ${id}`, res, data }))
      .catch(error => handleError({ code: 500, message: error, res, error }))
  }

  public CreateSubject = (req: Request, res: Response) => {
    const [error, createSubjectDTO] = CreateSubjectDTO.create(req.body);
    if (error) return handleError({ code: 400, message: error, res });

    new CreateSubject(this.subjectRepository)
      .execute(createSubjectDTO!)
      .then(data => handleSuccess({ code: 200, message: 'Subject created', res, data }))
      .catch(error => handleError({ code: 500, message: error, res, error }))
  }

  public updateSubject = (req: Request, res: Response) => {

    const [error, updateSubjectDTO] = UpdateSubjectDTO.create({ ...req.body, id: req.params.id });
    if (error) return handleError({ code: 400, message: error, res });

    new UpdateSubject(this.subjectRepository)
      .execute(updateSubjectDTO!)
      .then(data => handleSuccess({ code: 200, message: `Subject ${req.params.id} updated`, res, data }))
      .catch(error => handleError({ code: 500, message: error, res, error }))

  }

  public deleteSubject = (req: Request, res: Response) => {

    new DeleteSubject(this.subjectRepository)
      .execute(req.params.id)
      .then(data => handleSuccess({ code: 200, message: `Subject ${req.params.id} deleted`, res, data }))
      .catch(error => handleError({ code: 500, message: error, res, error }))
  }

  public enrollStudent = (req: Request, res: Response) => {
    const { id_student, id_subject } = req.body;

    const [error, enrollSubjectDTO] = EnrollStudentDTO.create({ id_student, id_subject });
    if (error) return handleError({ code: 400, message: error!, res });

    new EnrollStudent(this.subjectRepository)
      .execute(id_student, id_subject)
      .then(data => handleSuccess({ code: 200, message: `User enrolled`, res, data }))
      .catch(error => handleError({ code: 500, message: error, res, error }))
  }

  public evidenceBySubject = (req: Request, res: Response) => {
    new EvidencesBySubject(this.subjectRepository)
      .execute()
      .then((data:any) => {

        var evidencesBySubject = data.map(({ id, name, evidences }:any) => ({
          id,
          name,
          evidences: evidences.length
        }))

        handleSuccess({ code: 200, message: 'Evidences by subject', res, data: evidencesBySubject })

      })
  }


}