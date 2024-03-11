import { SubjectEntity } from "../entities/subject.entity";
import { SubjectRepository } from "../repositories/subject.repository";

interface GetSubjectByIDUseCase {
  execute( id: string ): Promise<SubjectEntity>;
}

export class GetSubjectByID implements GetSubjectByIDUseCase {

  constructor(
    private readonly repository: SubjectRepository
  ) {}

  execute( id: string ): Promise<SubjectEntity> {
    return this.repository.getByID( id );
  }

}