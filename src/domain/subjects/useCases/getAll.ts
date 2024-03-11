import { SubjectEntity } from "../entities/subject.entity";
import { SubjectRepository } from "../repositories/subject.repository";

interface GetAllSubjectsUseCase {
  execute(): Promise<SubjectEntity[]>;
}

export class GetAllSubjects implements GetAllSubjectsUseCase {

  constructor(
    private readonly repository: SubjectRepository
  ) {}

  execute(): Promise<SubjectEntity[]> {
    return this.repository.getAll();
  }

}