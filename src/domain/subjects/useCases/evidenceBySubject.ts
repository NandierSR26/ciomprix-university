import { SubjectEntity } from "../entities/subject.entity";
import { SubjectRepository } from "../repositories/subject.repository";

export class EvidencesBySubject {

  constructor(
    private readonly repository: SubjectRepository
  ) {}

  execute(): Promise<SubjectEntity[]> {
    return this.repository.evidenceBySubject();
  }

}