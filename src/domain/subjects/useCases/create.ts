import { CreateSubjectDTO } from "../dtos/create.dto";
import { SubjectEntity } from "../entities/subject.entity";
import { SubjectRepository } from "../repositories/subject.repository";

interface CreateSubjectUseCase {
  execute( dto: CreateSubjectDTO ): Promise<SubjectEntity>;
}

export class CreateSubject implements CreateSubjectUseCase {

  constructor(
    private readonly repository: SubjectRepository
  ) {}

  execute( dto: CreateSubjectDTO ): Promise<SubjectEntity> {
    return this.repository.create( dto );
  }

}