import { EnrollSubjectEntity } from "../entities/enroll.entity";
import { SubjectRepository } from "../repositories/subject.repository";

export class GetSubjectsByUser {
  constructor(
    private readonly repository: SubjectRepository
  ) {}

  execute( id_user: string ): Promise<EnrollSubjectEntity[]> {
    return this.repository.getByUser( id_user );
  }
}