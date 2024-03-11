import { SubjectRepository } from "../repositories/subject.repository";

export class EnrollStudent {

  constructor(
    private readonly repository: SubjectRepository
  ) {}

  execute( studentID: string, subjectID: string ): Promise<void> {
    return this.repository.enrollStudent( studentID, subjectID );
  }

}