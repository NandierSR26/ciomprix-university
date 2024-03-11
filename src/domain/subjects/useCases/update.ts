import { UpdateSubjectDTO } from "../dtos/update.dto";
import { SubjectEntity } from "../entities/subject.entity";
import { SubjectRepository } from "../repositories/subject.repository";

interface UpdateSubjectUseCase {
  execute( dto: UpdateSubjectDTO ): Promise<SubjectEntity>;
}

export class UpdateSubject implements UpdateSubjectUseCase {

  constructor(
    private readonly repository: SubjectRepository
  ) {}

  execute( dto: UpdateSubjectDTO ): Promise<SubjectEntity> {
    return this.repository.updateByID( dto );
  }

}