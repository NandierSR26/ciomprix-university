import { SubjectEntity } from "../entities/subject.entity";
import { SubjectRepository } from "../repositories/subject.repository";

interface DeleteSubjectUseCase {
  execute( id: string ): Promise<SubjectEntity>;
}

export class DeleteSubject implements DeleteSubjectUseCase {

  constructor(
    private readonly repository: SubjectRepository
  ) {}

  execute( id: string ): Promise<SubjectEntity> {
    return this.repository.delete( id );
  }

}